# haroune.me

Source for Haroune Mohammedi's personal site ([haroune.me](https://haroune.me)) and printable CV — both shipped in **English** and **French**, with Arabic scaffolded.

## What's in here

| Deliverable        | Source                                                | Output                                                       |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| Static site        | `site/template.mjs` + `site/locales/{en,fr}.mjs`      | `dist/index.html` (en), `dist/fr/index.html` (fr)            |
| Printable CV (PDF) | `cv/PlushCV.cls` + `cv/resume_{en,fr}.tex`            | `haroune_mohammedi_cv_en.pdf`, `haroune_mohammedi_cv_fr.pdf` |

The site uses CSS logical properties throughout, so the same stylesheet renders correctly for LTR (en/fr) and RTL (ar) the moment an `ar.mjs` locale is added. The PDF class loads `polyglossia` and accepts `\documentclass[english|french|arabic]{plushcv}`.

## Build

Requires Node 20+ for the site and XeLaTeX (via TeX Live or MacTeX) for the PDFs.

```sh
make site      # build the static site into dist/
make pdf       # build both locale PDFs at repo root
make all       # pdfs + site
make serve     # build, then serve dist/ on http://localhost:8000
make clean     # remove dist/ and .build/ intermediates
```

`make pdf-en` and `make pdf-fr` build a single locale. LaTeX intermediates land in `.build/` (gitignored); the canonical PDFs are committed at the repo root so CI doesn't need TeX Live. npm scripts (`npm run build`, `npm run pdf`, …) wrap the same commands.

## Repo layout

```
build.mjs                  Node site builder (zero deps)
Makefile                   Orchestration
package.json               npm scripts + engines (no deps)
cv/                        Self-contained LaTeX project
  PlushCV.cls              Shared class file (typography, layout, polyglossia)
  resume_{en,fr}.tex       Per-locale content
  fonts/                   Bundled OTF/TTF (Inter, Source Sans Pro, Office Code Pro)
  icons/                   Contact-line PNGs
site/
  template.mjs             render(locale, alternates) → HTML
  css/styles.css           Logical-property, RTL-ready stylesheet
  js/main.js               Canvas + interactions (locale-agnostic)
  locales/{en,fr}.mjs      Translation data
  public/                  Files copied verbatim into dist/ (CNAME, …)
haroune_mohammedi_cv_*.pdf Built PDFs (committed; CI picks them up)
```

## Deployment

GitHub Pages, via `.github/workflows/pages.yml`. On every push to `master` the workflow runs `node build.mjs` and uploads `dist/`. The Pages source must be set to "GitHub Actions".

## Adding a locale

1. Copy `site/locales/en.mjs` to `site/locales/<lang>.mjs`, translate, set `htmlLang` / `dir` / `ogLocale` / `cvFile`.
2. (Optional) Copy `cv/resume_en.tex` to `cv/resume_<lang>.tex` and add a matching `make pdf-<lang>` target.
3. `node build.mjs` discovers locales automatically and wires up `hreflang` + sitemap.

See `CLAUDE.md` for the full architecture notes, translation conventions, and the Arabic integration checklist.

## Credits & licensing

The PDF class is forked from [PlushCV](https://github.com/sansquoi/PlushCV) (itself a fork of [Deedy-Resume](https://github.com/deedy/Deedy-Resume)), with significant refactoring for multilingual support. See `LICENSE` (Apache 2.0) for the class file's license and `NOTICE` for a per-component breakdown — fonts, icons, and the resume content all fall under different terms.
