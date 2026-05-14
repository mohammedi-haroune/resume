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
BUILD      := $(ROOT)/.build
LATEX_OPTS := -interaction=nonstopmode -halt-on-error

PDF_EN := haroune_mohammedi_cv_en.pdf
PDF_FR := haroune_mohammedi_cv_fr.pdf

.PHONY: all site pdf pdf-en pdf-fr serve clean

# `make site` runs the Node build. It will pick up any PDFs sitting at the
# repo root (built by the pdf-* targets below) and copy them into dist/.
site:
	node build.js

# LaTeX intermediates (aux, log, etc.) go into .build/ — kept out of cv/ so
# the source tree stays clean. The class file, fonts/, and icons/ are
# resolved relative to $(ROOT) because that's the working directory at
# compile time. -jobname controls the output filename so we end up with
# the canonical "haroune_mohammedi_cv_<lang>.pdf" without a rename step.
pdf-en:
	@mkdir -p $(BUILD)
	xelatex $(LATEX_OPTS) -output-directory=$(BUILD) -jobname=cv_en cv/resume_en.tex
	@xelatex $(LATEX_OPTS) -output-directory=$(BUILD) -jobname=cv_en cv/resume_en.tex > /dev/null
	cp $(BUILD)/cv_en.pdf $(PDF_EN)
	@echo "→ $(PDF_EN) ready"

pdf-fr:
	@mkdir -p $(BUILD)
	xelatex $(LATEX_OPTS) -output-directory=$(BUILD) -jobname=cv_fr cv/resume_fr.tex
	@xelatex $(LATEX_OPTS) -output-directory=$(BUILD) -jobname=cv_fr cv/resume_fr.tex > /dev/null
	cp $(BUILD)/cv_fr.pdf $(PDF_FR)
	@echo "→ $(PDF_FR) ready"

pdf: pdf-en pdf-fr

all: pdf site

serve: site
	@echo "Serving on http://localhost:8000 — Ctrl-C to stop"
	python3 -m http.server 8000 --directory $(DIST)

clean:
	rm -rf $(DIST) $(BUILD)
