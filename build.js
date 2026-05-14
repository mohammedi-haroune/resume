#!/usr/bin/env node
// Static-site build for haroune.me.
//
// Inputs:
//   /locales/*.mjs       — one file per locale (en, fr, ar later)
//   /site/template.mjs   — single render() function
//   /site/css, /site/js  — shared assets
//   /site/public         — static files copied verbatim (CNAME, robots, favicon…)
//   /<lang>.pdf          — pre-built PDFs at repo root, if present
//
// Output:
//   /dist                — fully assembled site ready for GitHub Pages
//
// Adding a new locale is one step: drop a new file in /locales. The script
// discovers locales, generates one HTML file per locale (English at root,
// others under /<lang>/), and wires up hreflang + sitemap automatically.

import { readdir, mkdir, copyFile, writeFile, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const LOCALES_DIR = path.join(ROOT, "locales");
const SITE_DIR = path.join(ROOT, "site");
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://haroune.me";

async function loadLocales() {
  const files = (await readdir(LOCALES_DIR))
    .filter((f) => f.endsWith(".mjs"))
    .sort();
  const locales = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(LOCALES_DIR, f)).href);
    locales.push(mod.default);
  }
  if (!locales.some((l) => l.htmlLang === "en")) {
    throw new Error("Missing required default locale: en.mjs");
  }
  return locales;
}

function localePath(htmlLang) {
  return htmlLang === "en" ? "/" : `/${htmlLang}/`;
}

function buildAlternates(locales) {
  // hreflang tags help search engines surface the right locale; x-default
  // points crawlers without a language preference to the English version.
  const alts = locales.map((l) => ({
    hreflang: l.htmlLang,
    path: localePath(l.htmlLang),
    ogLocale: l.ogLocale,
  }));
  alts.push({
    hreflang: "x-default",
    path: "/",
    ogLocale: "en_US",
  });
  return alts;
}

async function copyDir(src, dest) {
  if (!existsSync(src)) return;
  await mkdir(dest, { recursive: true });
  for (const entry of await readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await copyFile(s, d);
  }
}

async function copyIfExists(src, dest) {
  if (!existsSync(src)) return false;
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);
  return true;
}

function buildSitemap(locales) {
  const now = new Date().toISOString().slice(0, 10);
  const urls = locales
    .map((l) => {
      const loc = `${SITE_URL}${localePath(l.htmlLang)}`;
      const alts = locales
        .map(
          (m) =>
            `    <xhtml:link rel="alternate" hreflang="${m.htmlLang}" href="${SITE_URL}${localePath(m.htmlLang)}"/>`,
        )
        .join("\n");
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

async function main() {
  console.log("→ Cleaning dist/");
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  console.log("→ Loading locales");
  const locales = await loadLocales();
  const alternates = buildAlternates(locales);
  console.log(`  found: ${locales.map((l) => l.htmlLang).join(", ")}`);

  console.log("→ Rendering pages");
  const { render } = await import(
    pathToFileURL(path.join(SITE_DIR, "template.mjs")).href
  );
  for (const t of locales) {
    const html = render(t, alternates);
    const outPath =
      t.htmlLang === "en"
        ? path.join(DIST, "index.html")
        : path.join(DIST, t.htmlLang, "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    console.log(`  wrote ${path.relative(ROOT, outPath)}`);
  }

  console.log("→ Copying assets");
  await copyDir(path.join(SITE_DIR, "css"), path.join(DIST, "css"));
  await copyDir(path.join(SITE_DIR, "js"), path.join(DIST, "js"));
  await copyDir(path.join(SITE_DIR, "public"), DIST);

  console.log("→ Staging PDFs (if present)");
  for (const t of locales) {
    const src = path.join(ROOT, t.cvFile);
    const dest = path.join(DIST, t.cvFile);
    if (await copyIfExists(src, dest)) {
      console.log(`  staged ${t.cvFile}`);
    } else {
      console.log(`  (skipped) ${t.cvFile} not built yet — run \`make pdf\``);
    }
  }

  console.log("→ Generating SEO files");
  await writeFile(path.join(DIST, "sitemap.xml"), buildSitemap(locales));
  await writeFile(path.join(DIST, "robots.txt"), buildRobots());

  console.log("✓ Build complete →", path.relative(ROOT, DIST));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
