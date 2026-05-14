// English locale.
//
// Conventions used by every locale file:
//   - `dir`: writing direction ("ltr" | "rtl"). Drives <html dir> + CSS logical fallbacks.
//   - `htmlLang`: BCP-47 tag for <html lang>.
//   - `ogLocale`: Open Graph locale tag (lang_REGION).
//   - `cvFile`: locale-specific PDF filename (must match Makefile output).
//   - String values are inserted into the template as-is and MAY contain limited
//     inline HTML (<strong>, <br>, <span class="...">). Content is author-controlled
//     at build time, so no runtime XSS surface. Keep markup minimal.
//   - Tech names, company names, and stack tags stay in English by convention —
//     French and Arabic CVs both follow this norm in the tech industry.

export default {
  htmlLang: "en",
  dir: "ltr",
  ogLocale: "en_US",
  cvFile: "haroune_mohammedi_resume.pdf",

  meta: {
    title: "Haroune Mohammedi — Senior Data Engineer",
    description:
      "Senior Data Engineer based in Paris. 7+ years building large-scale data pipelines on Databricks, PySpark, Kafka — bridging technical implementation and business impact.",
  },

  langSwitcher: {
    label: "Language",
    options: { en: "EN", fr: "FR", ar: "AR" },
  },

  nav: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    cv: "Download CV",
    toggleMenu: "Toggle menu",
  },

  hero: {
    label: "Paris, France · Open to opportunities",
    roleLine1: "Senior Data",
    roleLine2: "Engineer.",
    taglineLead: "Building data pipelines that",
    taglineAccent: "turn data into business value.",
    greeting: "I'm",
    contactLabel: "You can reach me on",
    socials: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
    summary: `For the past seven years, I've been building large-scale data
      pipelines that businesses actually depend on. At Engie that means
      designing infrastructure that moves
      <strong>50M+ rows a day</strong> of high-frequency energy data on
      Databricks and PySpark — and turning multi-week ETL jobs into
      <strong>sub-hour runs</strong> along the way. What I care about most
      is the bridge between technical decisions and business outcomes:
      pipelines that don't just move data, but deliver it reliably, on time,
      and in a form the business can actually act on.`,
    stack: [
      { text: "PySpark" },
      { text: "Databricks" },
      { text: "Python" },
      { text: "Scala" },
      { text: "Apache Kafka" },
      { text: "Kubernetes", tone: "c" },
      { text: "GCP", tone: "c" },
    ],
    ctaPrimary: "View my work",
    ctaCv: "Download CV",
    ctaSecondary: "Get in touch",
    scroll: "Scroll",
  },

  about: {
    label: "About me",
    title: "Who I am",
    paragraphs: [
      `I'm a Senior Data Engineer based in Paris with over
       <span class="hl">7 years of experience</span> building data systems
       that actually work in production.`,
      `My current focus is large-scale pipeline engineering on Databricks
       and PySpark. At Engie, I work with high-frequency energy consumption
       data — 50M+ rows a day — designing pipelines that need to be fast,
       reliable, and maintainable. I've cut execution times from weeks to
       hours through legacy ETL migrations, and achieved 90%+ performance
       improvements through architectural redesign.`,
      `I operate across the
       <span class="hl">full project lifecycle</span> — from functional
       analysis and architecture design through to deployment and
       production support. I care about understanding domain challenges
       deeply and bridging the gap between technical implementation and
       real business needs.`,
      `Before that, I helped build an MLOps platform from scratch at
       BigMama Technology, and spent years deep in distributed systems with
       Scala, Akka, and Kafka. That foundation still shapes how I think
       about data architecture today.`,
      `Open to Senior Data Engineer and Data Architect opportunities where
       <span class="hl">technical excellence and business impact</span> go
       hand in hand.`,
    ],
  },

  experience: {
    label: "Experience",
    title: "Where I've worked",
    items: [
      {
        period: "Feb 2024 — Present",
        location: "Paris, France",
        role: "Senior Data Engineer",
        company: "Engie",
        bullets: [
          `Designed and implemented large-scale data pipelines processing
           <strong>50M+ rows/day</strong> of high-frequency energy
           consumption data (30-min intervals) on Databricks/PySpark.`,
          `Migrated legacy ETL workflows from PL/SQL to PySpark on
           Databricks, reducing execution time
           <strong>from several weeks to a few hours</strong>.`,
          `Optimized PySpark pipelines achieving
           <strong>90%+ performance improvement</strong> (10 hours → under
           1 hour) through Spark tuning, partitioning strategies, and
           scalable architecture design.`,
          `Led projects end-to-end: functional analysis, architecture
           design, development, testing, deployment, and production
           support.`,
          `Ensured data quality, reliability, and monitoring in a critical
           energy infrastructure context.`,
        ],
        tags: ["PySpark", "Databricks", "Python", "SQL"],
      },
      {
        period: "May 2022 — Jan 2024",
        location: "Paris, France",
        role: "Senior Data Engineer",
        company: "Quadratic",
        bullets: [
          `Designed and implemented a
           <strong>real-time blockchain data integration pipeline</strong>,
           synchronizing on-chain smart contract events into MongoDB,
           bridging Web3 data to Web2 applications.`,
          `Designed MongoDB schema and data models optimized for query
           performance, translating raw blockchain event structures into
           clean, structured documents.`,
          `Defined GraphQL schema and data access patterns to expose
           structured contract and transaction data to frontend consumers.`,
          `Built automated integration and unit test suites ensuring
           <strong>data integrity and pipeline reliability</strong>.`,
        ],
        tags: ["Python", "MongoDB", "GraphQL", "Web3"],
      },
      {
        period: "Jul 2019 — Apr 2022",
        location: "Algiers, Algeria",
        role: "Senior Data Engineer",
        company: "BigMama Technology — MLOps Platform",
        bullets: [
          `Core developer of a
           <strong>cloud-agnostic MLOps platform</strong> on open standards
           (Docker, Kubernetes) supporting GCP, on-premise, and multi-cloud
           — no vendor lock-in by philosophy.`,
          `Deeply integrated <strong>MLflow</strong> for automated
           experiment tracking and <strong>Seldon Core</strong> for
           scalable model serving on Kubernetes.`,
          `Implemented one-click model packaging and deployment supporting
           TensorFlow, PyTorch, Scikit-learn and more.`,
          `Evaluated and benchmarked open-source MLOps tooling, developing
           deep expertise across the ML infrastructure ecosystem.`,
        ],
        tags: ["Python", "MLflow", "Seldon Core", "Kubernetes", "Docker", "GCP"],
      },
      {
        period: "Sep 2017 — Jul 2019",
        location: "Algiers, Algeria",
        role: "Data Engineer",
        company: "BigMama Technology — Health Monitoring Platform",
        bullets: [
          `Built and deployed a
           <strong>real-time health monitoring platform</strong> for
           elderly people living alone using Akka, Spark, Kafka,
           Elasticsearch, and Firebase — high-availability was a human
           requirement, not an engineering nice-to-have.`,
          `Developed an internal <strong>Scala SDK</strong> unifying
           integration across the stack (Firebase, Kafka, Akka), improving
           consistency across multiple projects.`,
          `Contributed to the design of complex distributed systems built
           on the <strong>actor model</strong>.`,
          `Provisioned Ansible automation for internal infrastructure setup
           and security hardening.`,
        ],
        tags: ["Scala", "Akka", "Kafka", "Spark", "Elasticsearch", "Ansible"],
      },
    ],
  },

  skills: {
    label: "Skills",
    title: "What I work with",
    domains: [
      {
        name: "Data & Processing",
        tags: ["PySpark", "Apache Spark", "Databricks", "Kafka", "Elasticsearch"],
      },
      {
        name: "Languages",
        tags: ["Python", "Scala", "SQL", "Shell"],
      },
      {
        name: "Cloud, DevOps & Infrastructure",
        tags: ["Docker", "Kubernetes", "Gitlab CI/CD", "Linux", "Proxmox", "AWS", "GCP"],
      },
      {
        name: "Databases & APIs",
        tags: ["MongoDB", "GraphQL", "Flask", "Django"],
      },
    ],
  },

  projects: {
    label: "Projects",
    title: "What I build for fun",
    items: [
      {
        year: "2025 — Present · Personal Project",
        name: "HomeLab",
        stack: ["Proxmox", "Ansible", "Python", "Linux"],
        desc: `I've wanted a HomeLab for years. Last year I finally built it, and
          it's become my favourite project.
          <br /><br />
          It's partly about privacy — I'm uncomfortable with how much of my
          digital life runs on infrastructure I don't control. Self-hosting
          is my answer. It's partly about independence — my data and
          services exist because I built them, not because a company decided
          to keep offering them.
          <br /><br />
          But mostly, it's my lab. When I want to understand a technology, I
          deploy it. Recently that meant running
          <strong style="color: var(--cyan)">local LLMs</strong> on my own
          hardware. A 3-2-1 backup strategy keeps everything safe.
          Infrastructure as code, reproducibility, resilience — the same
          principles I care about professionally, applied at home.`,
      },
      {
        year: "2018 · University Project",
        name: "Gesture-Controlled Video Player",
        stack: ["Scala", "Akka", "Keras"],
        desc: `A university project I'm still proud of — a video player
          controlled entirely by hand gestures, built as a fully
          distributed, reactive application.
          <br /><br />
          Gesture detection, video control logic, and the UI each ran as
          independent
          <strong style="color: var(--cyan)">Akka actors</strong>
          communicating asynchronously. Akka Remote handled distribution
          between components. The gesture recognition itself was a neural
          network trained with Keras. <br /><br />
          My first experience taking a trained model and integrating it into
          a live application pipeline. At the time I didn't have the
          vocabulary to call it MLOps — but the core challenge was exactly
          what I'd spend years working on later at BigMama.`,
      },
    ],
  },

  education: {
    label: "Education",
    title: "Academic background",
    items: [
      {
        degree: "PhD in Artificial Intelligence",
        degreeNote: "part-time, ongoing",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Data services management in multi-cloud environments",
        period: "2019 — Present",
      },
      {
        degree: "Master's in Artificial Intelligence",
        degreeNote: "",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Final project: Graph-based recommender system",
        period: "2017 — 2019",
      },
      {
        degree: "Bachelor's in Computer Science",
        degreeNote: "",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Final project: Web services relationship prediction using Spark — in collaboration with University of Michigan, USA",
        period: "2014 — 2017",
      },
    ],
  },

  contact: {
    label: "Let's talk",
    titleLead: "Get in",
    titleAccent: "touch.",
    sub: `Open to Senior Data Engineer and Data Architect opportunities in
      Paris and beyond. Always happy to talk about data architecture,
      MLOps, or distributed systems.`,
    emailLabel: "mohammedi.haroun@gmail.com",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
  },

  footer: "Haroune Mohammedi · Paris, France · Built with ♥ and too much coffee",
};
