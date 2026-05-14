% ============================================================================
%   plushcv — one-page CV class (forked from PlushCV / Deedy-Resume)
%   Original: Shubham Mazumder (mazumder.me) and Debarghya Das (deedydas)
%   Engine:   XeLaTeX (required — uses fontspec for OpenType, plus polyglossia
%             for multilingual typography)
%
%   Internationalization:
%   ---------------------
%   Language is picked via a class option:
%     \documentclass[english]{plushcv}   % default
%     \documentclass[french]{plushcv}
%     \documentclass[arabic]{plushcv}    % see RTL scaffolding below
%
%   The class loads polyglossia and sets the default language for the
%   document. polyglossia handles month names, quotation marks, hyphenation,
%   and (for Arabic) RTL paragraph direction. Document content stays in
%   plain XeTeX — no per-locale macro proliferation in this class.
%
%   Strings that the class itself emits (currently only "Last Updated on" in
%   \lastupdated) are exposed as overridable macros so .tex files can localize
%   them without forking the class.
%
%   Arabic (RTL) — scaffold only, requires extra work to fully render:
%     1. Enable the `arabic` option (loads polyglossia + bidi).
%     2. Add an Arabic font (Amiri / Noto Naskh Arabic / Cairo) — see the
%        commented \cvarabicfont block below.
%     3. Swap the column order/widths in the .tex (right column becomes left).
%     4. Replace \raggedright / \RaggedRight with \raggedleft / \RaggedLeft.
%     5. Visually proof for icon mirroring (the contact icons may need flipping).
% ============================================================================

\ProvidesClass{plushcv}[2026/05/14 CV class — i18n]
\NeedsTeXFormat{LaTeX2e}

% -----------------------------------------------------------------------------
% Language options
% -----------------------------------------------------------------------------
\newif\if@cv@french   \@cv@frenchfalse
\newif\if@cv@arabic   \@cv@arabicfalse
\newif\if@cv@english  \@cv@englishtrue

\DeclareOption{english}{\@cv@englishtrue  \@cv@frenchfalse \@cv@arabicfalse}
\DeclareOption{french} {\@cv@englishfalse \@cv@frenchtrue  \@cv@arabicfalse}
\DeclareOption{arabic} {\@cv@englishfalse \@cv@frenchfalse \@cv@arabictrue}

\DeclareOption{print}{\def\@cv@print{}}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass{article}

% -----------------------------------------------------------------------------
% Package imports
% -----------------------------------------------------------------------------
% Geometry — symmetric inline margins; works in both LTR and RTL.
% RTL note: keeping lmargin == rmargin means a horizontal mirror is a no-op,
% which simplifies the Arabic port. If they ever diverge, also flip them.
\usepackage[lmargin=0.9cm, vmargin=0.85cm, rmargin=0.9cm]{geometry}
\usepackage[hidelinks]{hyperref}
\usepackage{enumitem}
\usepackage{graphicx}
\usepackage{pifont}
\usepackage[document]{ragged2e}
\usepackage{array}

\usepackage{cite}
\renewcommand\refname{\vskip -1.5cm}

\usepackage[usenames,dvipsnames]{xcolor}
\definecolor{date}{HTML}{666666}
\definecolor{title}{HTML}{1D76E2}
\definecolor{primary}{HTML}{2b2b2b}
\definecolor{headings}{HTML}{6A6A6A}
\definecolor{subheadings}{HTML}{333333}

% -----------------------------------------------------------------------------
% Fonts — XeLaTeX / fontspec
% -----------------------------------------------------------------------------
% Latin display + body + monospace stack. All bundled fonts cover Latin
% Extended-A/B (French accents render correctly).
\def\pathtitlefont   {fonts/sourcesanspro/}
\def\firstnamefont   {sourcesanspro-SemiBold}
\def\secondnamefont  {sourcesanspro-light}
\def\titlefont       {sourcesanspro-regular}
\def\namefontsize    {9.5}

\def\pathmainfont    {fonts/inter/}
\def\mainfont        {inter-light}
\def\mainfontbold    {inter-semibold}
\def\mainfontsize    {9.5}
\def\mainsansfont    {inter-light}

\def\pathsubheadingfont {\pathtitlefont}
\def\subheadingfont     {\titlefont}
\def\subheadingsize     {11}

\def\pathdescriptorfont {\pathsubheadingfont}
\def\descriptorfont     {\secondnamefont}
\def\descriptorsize     {10}
\def\pathlocationfont   {\pathsubheadingfont}
\def\locationfont       {\subheadingfont}
\def\locationsize       {8pt}

\def\pathmonofont    {fonts/officecodeprod/}
\def\monofont        {OfficeCodeProD-Light}
\def\monofontregular {OfficeCodeProD-Regular}

% Arabic font scaffold — not loaded by default. To enable, drop an Arabic
% OpenType font into fonts/ (Amiri, Noto Naskh Arabic, or Cairo are good
% recruiter-readable choices) and uncomment the polyglossia \babelfont line
% below in the language block.
% \def\patharabicfont {fonts/amiri/}
% \def\arabicfont     {Amiri-Regular}
% \def\arabicfontbold {Amiri-Bold}

\usepackage{fontspec}
\setmainfont[
  Color=primary,
  Path=\pathmainfont,
  BoldFont=\mainfontbold,
  UprightFeatures={SizeFeatures={Size=\mainfontsize}},
  BoldFeatures={SizeFeatures={Size=\mainfontsize}}
]{\mainfont}
\setsansfont[
  Scale=MatchLowercase,
  Mapping=tex-text,
  Path=\pathmainfont,
  UprightFeatures={SizeFeatures={Size=\mainfontsize}}
]{\mainsansfont}

% -----------------------------------------------------------------------------
% Language setup — polyglossia
% -----------------------------------------------------------------------------
% polyglossia is XeLaTeX-native, plays nicely with fontspec, and (unlike
% babel) handles RTL scripts via the bidi package it pulls in automatically.
\usepackage{polyglossia}

\if@cv@arabic
  \setdefaultlanguage{arabic}
  \setotherlanguage{english}
  % To render Arabic glyphs, point polyglossia at an Arabic font:
  % \newfontfamily\arabicfont[Path=\patharabicfont, Script=Arabic]{\arabicfont}
  % TODO(arabic): the body of the .tex file must also flip the minipage
  % column order and switch \raggedright → \raggedleft.
\else\if@cv@french
  \setdefaultlanguage{french}
  \setotherlanguage{english}
\else
  \setdefaultlanguage{english}
\fi\fi

% -----------------------------------------------------------------------------
% Date helpers
% -----------------------------------------------------------------------------
% \today output is now driven by polyglossia and follows the document language.
\usepackage[absolute]{textpos}
\setlength{\TPHorizModule}{1mm}
\setlength{\TPVertModule}{1mm}

% Locale-specific "Last Updated on" prefix. Overridable from the .tex if a
% specific phrasing is preferred. Default uses polyglossia's language hooks.
\providecommand{\lastupdatedlabel}{%
  \if@cv@french Dernière mise à jour le%
  \else\if@cv@arabic آخر تحديث في%
  \else Last Updated on%
  \fi\fi}

\newcommand{\lastupdated}{\begin{textblock}{60}(155,5)
\color{date}\fontspec[Path=\pathmainfont]{\mainfont}\fontsize{8pt}{10pt}\selectfont
\lastupdatedlabel\ \today
\end{textblock}}

% -----------------------------------------------------------------------------
% Name / contact macros
% -----------------------------------------------------------------------------
\newcommand{\namesection}[4]{%
\noindent
\color{title}\RaggedRight
\fontsize{30pt}{40pt}\fontspec[Path=\pathtitlefont]{\firstnamefont}\selectfont #1\hspace{0.25em}\fontspec[Path=\pathtitlefont]{\secondnamefont}
\selectfont #2%
\hspace{0.3em}{\color{primary}\raisebox{0.00em}[0pt][0pt]{\fontspec[Path=\pathmonofont]{\monofontregular}\fontsize{18pt}{18pt}\bfseries    #3}}%
\par
\vspace{2pt}
\noindent\RaggedRight{\color{primary}\fontspec[Path=\pathmonofont]{\monofont}\fontsize{8pt}{10pt}\selectfont #4}%
\vspace{2pt}
\noindent\makebox[\linewidth]{\color{title}\rule{\paperwidth}{0pt}}%
\vspace{-15pt}
}

% -----------------------------------------------------------------------------
% Section / subsection formatting
% -----------------------------------------------------------------------------
\usepackage{titlesec}
\titlespacing{\section}{0pt}{5pt}{5pt}
\titlespacing{\subsection}{0pt}{0pt}{0pt}
\newcommand{\sectionsep}{\vspace{5pt}}

\titleformat{\section}{\color{title}
\scshape\fontspec[Path=\pathtitlefont]{\titlefont}\fontsize{16pt}{24pt}\selectfont \raggedright}{}{0em}{}

\titleformat{\subsection}{
\color{subheadings}\fontspec[Path=\pathsubheadingfont]{\subheadingfont}\fontsize{\subheadingsize}{14pt}\selectfont\bfseries\MakeUppercase}{}{0em}{}

% \uppercase doesn't know about non-ASCII letters (it leaves "é" alone).
% \MakeUppercase is locale-aware via polyglossia, so French headings like
% "EXPÉRIENCE" render correctly.
\newcommand{\runsubsection}[1]{
\color{subheadings}\fontspec[Path=\pathsubheadingfont]{\subheadingfont}\fontsize{\subheadingsize}{14pt}\selectfont\bfseries\MakeUppercase{#1}\normalfont}

\newcommand{\descript}[1]{
\color{subheadings}\raggedright\scshape\fontspec[Path=\pathdescriptorfont]{\descriptorfont}\fontsize{\descriptorsize}{13pt}\selectfont {#1} \normalfont}

\newcommand{\location}[1]{
\color{headings}\raggedright\fontspec[Path=\pathlocationfont]{\locationfont}\fontsize{\locationsize}{12pt}\selectfont {#1} \normalfont}

% -----------------------------------------------------------------------------
% Contact line — purely visual (icons + hyperlinks), no language-specific text
% -----------------------------------------------------------------------------
\newcommand{\contactline}[6]{\begingroup
\setbox0=\hbox{
\includegraphics[scale=0.23,trim={1.4cm 1.25cm -0.4cm 0cm}]{icons/main/website.png}{#6}
\includegraphics[scale=0.23,trim={0cm 1.25cm -0.4cm 0cm}]{icons/main/mail.png}{#4}
\includegraphics[scale=0.21,trim={0cm 1.25cm -0.4cm 0cm}]{icons/main/phone.png}{#5}
\includegraphics[scale=0.23,trim={0cm 1.25cm -0.4cm 0cm}]{icons/main/github.png}{#2}
\includegraphics[scale=0.23,trim={0cm 1.25cm -0.4cm 0cm}]{icons/main/linkedin.png}{#3}
\includegraphics[scale=0.21,trim={0cm 1.25cm -0.4cm 0cm}]{icons/main/home.png}{#1}
}\parbox{\wd0}{\box0}\endgroup}

\newcommand{\vcenteredinclude}[2]{\begingroup
\setbox0=\hbox{\includegraphics[scale=0.10,trim={0 0.7cm 0cm 0cm}]{#1} {#2}}
\parbox{\wd0}{\box0}\endgroup}

% Bullet list with tight spacing. \ding{212} is a small right-pointing
% arrow from Zapf Dingbats. For RTL (Arabic), substitute \ding{213} (left
% arrow) — see the .tex's local override pattern.
\newenvironment{tightemize}{
\vspace{-\topsep}\begin{itemize}[label=\ding{212}]\itemsep1pt \parskip0pt \parsep0pt}
{\end{itemize}\vspace{-\topsep}}
