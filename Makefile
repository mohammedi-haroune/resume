# ──────────────────────────────────────────────────────────────────────────
# haroune.me — build orchestration
#
#   make site      # build the static site into dist/
#   make pdf       # build all locale PDFs and stage them at repo root
#   make pdf-en    # build the English PDF only
#   make pdf-fr    # build the French PDF only
#   make all       # pdf + site (full reproducible build)
#   make serve     # build, then serve dist/ on http://localhost:8000
#   make clean     # remove dist/ and intermediate LaTeX artifacts
# ──────────────────────────────────────────────────────────────────────────

ROOT       := $(CURDIR)
DIST       := $(ROOT)/dist
LATEX_OPTS := -interaction=nonstopmode -halt-on-error

PDF_EN := haroune_mohammedi_resume.pdf
PDF_FR := haroune_mohammedi_cv_fr.pdf

.PHONY: all site pdf pdf-en pdf-fr serve clean

# `make site` runs the Node build. It will pick up any PDFs sitting at the
# repo root (built by the pdf-* targets below) and copy them into dist/.
site:
	node build.js

# We compile each locale's .tex with output-directory pointed at the source
# directory (cv/<locale>/) so LaTeX's aux/log files don't pollute the repo
# root. The class file, fonts/, and icons/ are resolved relative to $(ROOT)
# because that's the working directory at compile time.
pdf-en:
	xelatex $(LATEX_OPTS) -output-directory=cv/en cv/en/resume.tex
	@xelatex $(LATEX_OPTS) -output-directory=cv/en cv/en/resume.tex > /dev/null
	cp cv/en/resume.pdf $(PDF_EN)
	@echo "→ $(PDF_EN) ready"

pdf-fr:
	xelatex $(LATEX_OPTS) -output-directory=cv/fr cv/fr/resume.tex
	@xelatex $(LATEX_OPTS) -output-directory=cv/fr cv/fr/resume.tex > /dev/null
	cp cv/fr/resume.pdf $(PDF_FR)
	@echo "→ $(PDF_FR) ready"

pdf: pdf-en pdf-fr

all: pdf site

serve: site
	@echo "Serving on http://localhost:8000 — Ctrl-C to stop"
	python3 -m http.server 8000 --directory $(DIST)

clean:
	rm -rf $(DIST)
	rm -f cv/en/*.aux cv/en/*.log cv/en/*.out cv/en/*.synctex.gz cv/en/resume.pdf
	rm -f cv/fr/*.aux cv/fr/*.log cv/fr/*.out cv/fr/*.synctex.gz cv/fr/resume.pdf
