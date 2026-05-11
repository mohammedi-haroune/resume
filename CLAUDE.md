# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This repo holds two parallel deliverables for Haroune Mohammedi's personal resume:

1. **`site/`** — the static personal site served at `haroune.me`. `site/index.html` + `site/css/styles.css` + `site/js/main.js`, plus `site/CNAME`. No build step, no bundler, no framework.
2. **`haroune_mohammedi_resume.tex`** + **`PlushCV.cls`** — the printable one-page PDF resume, compiled with XeLaTeX.

Both must stay in sync content-wise (roles, dates, bullets, stack), but they're edited independently — there is no shared source.

## Build & preview commands

PDF resume (requires XeLaTeX + the bundled `fonts/`):

```sh
xelatex haroune_mohammedi_resume.tex
```

Web site — no build. Preview locally with any static server, e.g.:

```sh
python3 -m http.server 8000 --directory site   # then open http://localhost:8000
```

Deployment is via GitHub Pages, driven by `.github/workflows/pages.yml`. The workflow uploads `site/` on every push to `master`. The repo's Pages source is set to "GitHub Actions" (not "Deploy from a branch").

## `site/` structure

Three files: markup in `site/index.html`, design tokens + layout in `site/css/styles.css`, canvas + scroll-spy in `site/js/main.js`. The HTML links to the CSS in `<head>` and to the JS at the end of `<body>` (DOM must be parsed before `main.js` runs — it queries `#pipeline-canvas` and `.fade-in` immediately).

Section IDs in order: `hero`, `about`, `experience`, `skills`, `projects`, `education`, `contact` — the nav and `IntersectionObserver` active-link logic depend on these IDs matching.

Design system lives in CSS custom properties on `:root` at the top of `site/css/styles.css`: `--bg`, `--surface`, `--orange` (#f97316), `--cyan` (#22d3ee). Orange = primary accent, cyan = secondary. Stick to these tokens instead of hard-coding hex.

The animated background is a `<canvas id="pipeline-canvas">` driven by the first IIFE in `site/js/main.js` (nodes + flowing packets — "data pipeline" metaphor). It honors `prefers-reduced-motion` and downshifts node/packet counts on mobile (`(max-width: 768px)`).

Fonts are loaded from Google Fonts: Syne (display), IBM Plex Sans (body), IBM Plex Mono (labels/nav).

## `haroune_mohammedi_resume.tex` / `PlushCV.cls`

`PlushCV.cls` is the local class (forked from PlushCV / deedy-resume). It hard-codes paths into `fonts/` — when changing the title font, update the `\pathtitlefont` / `\firstnamefont` block in the cls. Multiple font presets are present, commented out.

Known constraint baked into the template: content must fit one page. Overflow silently spills onto a second page with broken alignment — when adding bullets, trim elsewhere.

## Content positioning (important)

The site leads with **Senior Data Engineer** positioning. MLOps experience is intentionally kept only in the About section and the BigMama experience entry — it is **not** surfaced in the hero, tagline, skills pills, or section titles. Preserve this when editing, the goal is to lead with the most relevant positioning for the target audience (data engineering roles) while still including MLOps experience in a way that doesn't dilute the core narrative to avoid confusion and misalignment and thus increase the chances of landing interviews for Senior/Architect Data Engineering roles.

## Notes

- `.aux`, `.log`, `.out`, `.synctex.gz` are gitignored; `.pdf` is committed (it's the published artifact).
- `me.jpg` is referenced from a commented-out `\includegraphics` in the tex — kept for optional photo variant.
