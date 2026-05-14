# haroune.me

Source for Haroune Mohammedi's personal site ([haroune.me](https://haroune.me)) and printable CV — both shipped in **English** and **French**, with Arabic scaffolded.

## What's in here

| Deliverable        | Source                                        | Output                                                     |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------- |
| Static site        | `site/template.mjs` + `locales/{en,fr}.mjs`   | `dist/index.html` (en), `dist/fr/index.html` (fr)          |
| Printable CV (PDF) | `PlushCV.cls` + `cv/resume_{en,fr}.tex`       | `haroune_mohammedi_cv_en.pdf`, `haroune_mohammedi_cv_fr.pdf` |

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

`make pdf-en` and `make pdf-fr` build a single locale. LaTeX intermediates land in `.build/` (gitignored); the canonical PDFs are committed at the repo root so CI doesn't need TeX Live.

## Deployment

GitHub Pages, via `.github/workflows/pages.yml`. On every push to `master` the workflow runs `node build.js` and uploads `dist/`. The Pages source must be set to "GitHub Actions".

## Adding a locale

1. Copy `locales/en.mjs` to `locales/<lang>.mjs`, translate, set `htmlLang` / `dir` / `ogLocale` / `cvFile`.
2. (Optional) Copy `cv/resume_en.tex` to `cv/resume_<lang>.tex` and add a matching `make pdf-<lang>` target.
3. `node build.js` discovers locales automatically and wires up `hreflang` + sitemap.

See `CLAUDE.md` for the full architecture notes, translation conventions, and the Arabic integration checklist.

## Credits

The PDF class is forked from [PlushCV](https://github.com/sansquoi/PlushCV) (itself a fork of [Deedy-Resume](https://github.com/deedy/Deedy-Resume)), with significant refactoring for multilingual support. Original templates are licensed under Apache 2.0 — see `LICENSE`.
