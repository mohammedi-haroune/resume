// Site template — renders a complete HTML document from a locale object.
//
// Why a JS function instead of a {{handlebars}}-style template?
//   - Zero parsing/dep cost: we already need Node to run the build.
//   - Multi-line strings + map().join() are native, no template grammar to learn.
//   - Editor highlighting works (with the // html lit-html convention some IDEs support).
//
// All interpolations are author-controlled (the locale files in /locales). There is
// no untrusted input at build time, so we do not HTML-escape. Authors are responsible
// for valid markup. The trade-off: hand-authored expressiveness over defensive escaping.

const SITE_URL = "https://haroune.me";

// Build absolute href for a given locale's homepage.
// English is served at root; other locales live under their lang code.
export function localePath(htmlLang) {
  return htmlLang === "en" ? "/" : `/${htmlLang}/`;
}

// Build relative path to assets based on locale depth.
// English (root): css/styles.css
// French (fr/): ../css/styles.css
function assetPath(htmlLang, asset) {
  const prefix = htmlLang === "en" ? "" : "../";
  return `${prefix}${asset}`;
}

// Build relative path for navigation and other links based on current locale depth
// English (root):
//   - to root: ./
//   - to fr: fr/
// French (fr/):
//   - to root: ../
//   - to fr: ./
function navPath(currentLang, targetLang) {
  if (currentLang === targetLang) {
    return "./";
  }
  if (currentLang === "en" && targetLang === "fr") {
    return "fr/";
  }
  if (currentLang === "fr" && targetLang === "en") {
    return "../";
  }
  return targetLang === "en" ? "/" : `/${targetLang}/`;
}

// Build relative path for files (PDFs, etc) based on locale depth
function filePath(htmlLang, file) {
  const prefix = htmlLang === "en" ? "" : "../";
  return `${prefix}${file}`;
}

export function render(t, alternates) {
  const here = localePath(t.htmlLang);
  const canonical = `${SITE_URL}${here}`;

  return `<!doctype html>
<html lang="${t.htmlLang}" dir="${t.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t.meta.title}</title>
    <meta name="description" content="${t.meta.description}" />
    <link rel="canonical" href="${canonical}" />
${alternates
  .map(
    (a) =>
      `    <link rel="alternate" hreflang="${a.hreflang}" href="${SITE_URL}${a.path}" />`,
  )
  .join("\n")}

    <!-- Open Graph -->
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="${t.ogLocale}" />
${alternates
  .filter((a) => a.hreflang !== t.htmlLang && a.hreflang !== "x-default")
  .map((a) => `    <meta property="og:locale:alternate" content="${a.ogLocale}" />`)
  .join("\n")}
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${t.meta.title}" />
    <meta property="og:description" content="${t.meta.description}" />
    <meta property="og:profile:first_name" content="Haroune" />
    <meta property="og:profile:last_name" content="Mohammedi" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${t.meta.title}" />
    <meta name="twitter:description" content="${t.meta.description}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${assetPath(t.htmlLang, "css/styles.css")}" />

    <script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Haroune Mohammedi",
    jobTitle: `${t.hero.roleLine1} ${t.hero.roleLine2}`.replace(/\.$/, ""),
    description: t.meta.description,
    url: canonical,
    email: "mailto:mohammedi.haroun@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.linkedin.com/in/haroune-mohammedi-3b3836170/",
      "https://www.github.com/mohammedi-haroune",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
    },
  },
  null,
  2,
)}
    </script>
  </head>
  <body>
    <div class="nav-overlay" id="nav-overlay"></div>
    <nav id="nav">
      <a href="#hero" class="nav-name">haroune.me</a>
      <ul class="nav-links" id="nav-links">
        <li><a href="#about">${t.nav.about}</a></li>
        <li><a href="#experience">${t.nav.experience}</a></li>
        <li><a href="#skills">${t.nav.skills}</a></li>
        <li><a href="#projects">${t.nav.projects}</a></li>
        <li><a href="#contact">${t.nav.contact}</a></li>
        <li class="nav-lang" role="group" aria-label="${t.langSwitcher.label}">
${alternates
  .filter((a) => a.hreflang !== "x-default")
  .map((a) => {
    const isCurrent = a.hreflang === t.htmlLang;
    const label = t.langSwitcher.options[a.hreflang] || a.hreflang.toUpperCase();
    const href = navPath(t.htmlLang, a.hreflang);
    return `          <a href="${href}" lang="${a.hreflang}" hreflang="${a.hreflang}"${isCurrent ? ' aria-current="page" class="active"' : ""}>${label}</a>`;
  })
  .join("\n")}
        </li>
        <li>
          <a
            href="${filePath(t.htmlLang, t.cvFile)}"
            target="_blank"
            class="nav-cv"
            >${t.nav.cv}</a
          >
        </li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="${t.nav.toggleMenu}">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- HERO -->
    <section id="hero">
      <canvas id="pipeline-canvas"></canvas>
      <div class="hero-content">
        <div class="hero-label">${t.hero.label}</div>

        <div class="hero-top">
          <h1 class="hero-role">
            ${t.hero.roleLine1}<br /><span class="last">${t.hero.roleLine2}</span>
          </h1>
          <p class="hero-tagline">
            ${t.hero.taglineLead}
            <span class="accent">${t.hero.taglineAccent}</span>
          </p>
        </div>

        <div class="hero-intro">
          <p class="hero-greeting">
            <span>${t.hero.greeting}</span>
            <span class="hero-name-big">Haroune Mohammedi</span>
          </p>
          <div class="hero-contact-line">
            <span class="hero-contact-label">${t.hero.contactLabel}</span>
            <div class="hero-socials">
              <a
                href="mailto:mohammedi.haroun@gmail.com"
                class="social-btn"
                title="${t.hero.socials.email}"
                aria-label="${t.hero.socials.email}"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/haroune-mohammedi-3b3836170/"
                target="_blank"
                class="social-btn"
                title="${t.hero.socials.linkedin}"
                aria-label="${t.hero.socials.linkedin}"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="https://www.github.com/mohammedi-haroune"
                target="_blank"
                class="social-btn"
                title="${t.hero.socials.github}"
                aria-label="${t.hero.socials.github}"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p class="hero-summary">
          ${t.hero.summary}
        </p>

        <div class="hero-stack">
${t.hero.stack
  .map(
    (p) =>
      `          <span class="stack-pill${p.tone ? " " + p.tone : ""}">${p.text}</span>`,
  )
  .join("\n")}
        </div>

        <div class="hero-ctas">
          <a href="#experience" class="btn btn-primary">${t.hero.ctaPrimary}</a>
          <a
            href="/${t.cvFile}"
            target="_blank"
            class="btn btn-cv-mobile"
            >${t.hero.ctaCv}</a
          >
          <a href="#contact" class="btn btn-secondary">${t.hero.ctaSecondary}</a>
        </div>
      </div>

      <div class="scroll-hint">
        <div class="scroll-wheel"></div>
        <span class="scroll-label">${t.hero.scroll}</span>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about">
      <div class="section-inner fade-in">
        <div class="section-label">${t.about.label}</div>
        <h2 class="section-title">${t.about.title}</h2>
        <div class="about-text">
${t.about.paragraphs.map((p) => `          <p>${p}</p>`).join("\n")}
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience">
      <div class="section-inner">
        <div class="section-label fade-in">${t.experience.label}</div>
        <h2 class="section-title fade-in">${t.experience.title}</h2>
        <div class="timeline">
${t.experience.items
  .map(
    (it) => `          <div class="tl-item fade-in">
            <div class="tl-dot"></div>
            <div class="tl-meta">
              <span class="tl-period">${it.period}</span> · ${it.location}
            </div>
            <div class="tl-role">${it.role}</div>
            <div class="tl-company">${it.company}</div>
            <ul class="tl-bullets">
${it.bullets.map((b) => `              <li>${b}</li>`).join("\n")}
            </ul>
            <div>
${it.tags.map((tag) => `              <span class="tl-tag">${tag}</span>`).join("\n")}
            </div>
          </div>`,
  )
  .join("\n\n")}
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills">
      <div class="section-inner">
        <div class="section-label fade-in">${t.skills.label}</div>
        <h2 class="section-title fade-in">${t.skills.title}</h2>
        <div class="skills-grid">
${t.skills.domains
  .map(
    (d) => `          <div class="skill-card fade-in">
            <div class="skill-domain">${d.name}</div>
            <div class="skill-list">
${d.tags.map((tag) => `              <span class="skill-tag">${tag}</span>`).join("\n")}
            </div>
          </div>`,
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects">
      <div class="section-inner">
        <div class="section-label fade-in">${t.projects.label}</div>
        <h2 class="section-title fade-in">${t.projects.title}</h2>
        <div class="projects-grid">
${t.projects.items
  .map(
    (p) => `          <div class="project-card fade-in">
            <div class="project-year">${p.year}</div>
            <div class="project-name">${p.name}</div>
            <div class="project-stack">
${p.stack.map((s) => `              <span>${s}</span>`).join("\n")}
            </div>
            <p class="project-desc">
              ${p.desc}
            </p>
          </div>`,
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section id="education">
      <div class="section-inner">
        <div class="section-label fade-in">${t.education.label}</div>
        <h2 class="section-title fade-in">${t.education.title}</h2>
        <div class="edu-list">
${t.education.items
  .map(
    (e) => `          <div class="edu-item fade-in">
            <div>
              <div class="edu-degree">
                ${e.degree}${
                  e.degreeNote
                    ? `
                <span class="edu-degree-note"> · ${e.degreeNote}</span>`
                    : ""
                }
              </div>
              <div class="edu-school">${e.school}</div>
              <div class="edu-note">${e.note}</div>
            </div>
            <div class="edu-period">${e.period}</div>
          </div>`,
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact">
      <div class="section-inner fade-in">
        <div class="contact-wrapper">
          <div class="section-label contact-label-centered">${t.contact.label}</div>
          <h2 class="contact-title">
            ${t.contact.titleLead}<br /><span class="contact-title-accent">${t.contact.titleAccent}</span>
          </h2>
          <p class="contact-sub">
            ${t.contact.sub}
          </p>
          <div class="contact-links">
            <a href="mailto:mohammedi.haroun@gmail.com" class="contact-link" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
              ${t.contact.emailLabel}
            </a>
            <a
              href="https://www.linkedin.com/in/haroune-mohammedi-3b3836170/"
              target="_blank"
              class="contact-link"
              aria-label="${t.contact.linkedinLabel}"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              ${t.contact.linkedinLabel}
            </a>
            <a
              href="https://www.github.com/mohammedi-haroune"
              target="_blank"
              class="contact-link"
              aria-label="${t.contact.githubLabel}"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
              ${t.contact.githubLabel}
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer>
      ${t.footer}
    </footer>

    <script src="${assetPath(t.htmlLang, "js/main.js")}"></script>
  </body>
</html>
`;
}
