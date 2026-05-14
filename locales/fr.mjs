// French locale — see en.mjs for conventions.
//
// Translation notes (recruiter-facing French resume conventions):
//   - Job titles like "Senior Data Engineer", "Data Architect" stay in English:
//     these are the actual search terms recruiters use in French job markets.
//   - Tech terms (pipeline, stack, scalable, monitoring, dataset, etc.) stay
//     untranslated where they're the natural word in French tech writing.
//   - Section labels follow French CV norms: "Expérience" / "Formation" /
//     "Compétences" rather than literal translations of the English.
//   - Months use the standard French abbreviations: Janv., Févr., Mars, Avr.,
//     Mai, Juin, Juil., Août, Sept., Oct., Nov., Déc.

export default {
  htmlLang: "fr",
  dir: "ltr",
  ogLocale: "fr_FR",
  cvFile: "haroune_mohammedi_cv_fr.pdf",

  meta: {
    title: "Haroune Mohammedi — Senior Data Engineer",
    description:
      "Senior Data Engineer basé à Paris. 7+ ans à concevoir des pipelines de données à grande échelle sur Databricks, PySpark, Kafka — au croisement de l'expertise technique et de l'impact business.",
  },

  langSwitcher: {
    label: "Langue",
    options: { en: "EN", fr: "FR", ar: "AR" },
  },

  nav: {
    about: "À propos",
    experience: "Expérience",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contact",
    cv: "Télécharger CV",
    toggleMenu: "Ouvrir le menu",
  },

  hero: {
    label: "Paris, France · Ouvert aux opportunités",
    roleLine1: "Senior Data",
    roleLine2: "Engineer.",
    taglineLead: "Je conçois des pipelines de données qui",
    taglineAccent: "transforment la donnée en valeur business.",
    greeting: "Je suis",
    contactLabel: "Retrouvez-moi sur",
    socials: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
    summary: `Depuis sept ans, je conçois des pipelines de données à grande
      échelle sur lesquels les entreprises s'appuient réellement. Chez
      Engie, cela signifie une infrastructure qui déplace
      <strong>plus de 50M de lignes/jour</strong> de données énergétiques
      haute fréquence sur Databricks et PySpark — et qui fait passer des
      jobs ETL de plusieurs semaines à des
      <strong>traitements de moins d'une heure</strong>. Ce qui m'importe
      le plus, c'est le pont entre les décisions techniques et les
      résultats business : des pipelines qui ne se contentent pas de
      déplacer la donnée, mais qui la livrent de façon fiable, dans les
      temps, et sous une forme directement exploitable par les métiers.`,
    stack: [
      { text: "PySpark" },
      { text: "Databricks" },
      { text: "Python" },
      { text: "Scala" },
      { text: "Apache Kafka" },
      { text: "Kubernetes", tone: "c" },
      { text: "GCP", tone: "c" },
    ],
    ctaPrimary: "Voir mon parcours",
    ctaCv: "Télécharger CV",
    ctaSecondary: "Me contacter",
    scroll: "Défiler",
  },

  about: {
    label: "À propos",
    title: "Qui suis-je",
    paragraphs: [
      `Senior Data Engineer basé à Paris, fort de plus de
       <span class="hl">7 ans d'expérience</span> à construire des
       systèmes de données qui tiennent vraiment en production.`,
      `Aujourd'hui, je suis focalisé sur l'ingénierie de pipelines à
       grande échelle sur Databricks et PySpark. Chez Engie, je traite des
       données de consommation énergétique haute fréquence — plus de 50M
       de lignes par jour — en concevant des pipelines qui doivent être
       rapides, fiables et maintenables. J'ai ramené des temps d'exécution
       de plusieurs semaines à quelques heures via des migrations d'ETL
       legacy, et obtenu plus de 90 % de gain de performance par redesign
       d'architecture.`,
      `J'interviens sur l'ensemble du
       <span class="hl">cycle de vie projet</span> — de l'analyse
       fonctionnelle et la conception d'architecture jusqu'au déploiement
       et au support de production. Comprendre les enjeux métier en
       profondeur et faire le pont entre l'implémentation technique et les
       vrais besoins business, c'est ce qui me motive.`,
      `Auparavant, j'ai participé à construire from scratch une plateforme
       MLOps chez BigMama Technology, et passé plusieurs années à fond
       dans les systèmes distribués avec Scala, Akka et Kafka. Ce socle
       continue à structurer ma façon de penser l'architecture data
       aujourd'hui.`,
      `Ouvert aux opportunités Senior Data Engineer et Data Architect où
       <span class="hl">l'excellence technique et l'impact business</span>
       avancent main dans la main.`,
    ],
  },

  experience: {
    label: "Expérience",
    title: "Mon parcours",
    items: [
      {
        period: "Févr. 2024 — Présent",
        location: "Paris, France",
        role: "Senior Data Engineer",
        company: "Engie",
        bullets: [
          `Conception et mise en œuvre de pipelines de données à grande
           échelle traitant <strong>plus de 50M de lignes/jour</strong> de
           données de consommation énergétique haute fréquence
           (intervalles de 30 min) sur Databricks/PySpark.`,
          `Migration de workflows ETL legacy de PL/SQL vers PySpark sur
           Databricks, réduisant les temps d'exécution
           <strong>de plusieurs semaines à quelques heures</strong>.`,
          `Optimisation de pipelines PySpark avec
           <strong>plus de 90 % de gain de performance</strong>
           (10 h → moins d'1 h) via tuning Spark, stratégies de
           partitionnement et conception d'architecture scalable.`,
          `Pilotage de projets de bout en bout : analyse fonctionnelle,
           conception d'architecture, développement, tests, déploiement
           (MEP) et support production (RUN).`,
          `Garantie de la qualité, fiabilité et monitoring des données
           dans un contexte d'infrastructure énergétique critique.`,
        ],
        tags: ["PySpark", "Databricks", "Python", "SQL"],
      },
      {
        period: "Mai 2022 — Janv. 2024",
        location: "Paris, France",
        role: "Senior Data Engineer",
        company: "Quadratic",
        bullets: [
          `Conception et mise en œuvre d'un
           <strong>pipeline temps réel d'intégration de données
           blockchain</strong>, synchronisant les événements on-chain des
           smart contracts vers MongoDB pour rendre la donnée Web3
           accessible aux applications Web2.`,
          `Conception du schéma MongoDB et des modèles de données
           optimisés pour la performance des requêtes, en traduisant les
           structures brutes d'événements blockchain en documents propres
           et structurés.`,
          `Définition du schéma GraphQL et des patterns d'accès aux
           données pour exposer les données structurées des contrats et
           transactions aux consommateurs frontend.`,
          `Mise en place de suites de tests d'intégration et unitaires
           automatisées garantissant
           <strong>l'intégrité des données et la fiabilité du
           pipeline</strong>.`,
        ],
        tags: ["Python", "MongoDB", "GraphQL", "Web3"],
      },
      {
        period: "Juil. 2019 — Avr. 2022",
        location: "Alger, Algérie",
        role: "Senior Data Engineer",
        company: "BigMama Technology — Plateforme MLOps",
        bullets: [
          `Développeur principal d'une
           <strong>plateforme MLOps cloud-agnostique</strong> bâtie sur
           des standards ouverts (Docker, Kubernetes) supportant GCP,
           on-premise et multi-cloud — aucun vendor lock-in, par parti
           pris.`,
          `Intégration approfondie de <strong>MLflow</strong> pour le
           tracking automatisé d'expériences et de
           <strong>Seldon Core</strong> pour le serving scalable de
           modèles sur Kubernetes.`,
          `Mise en place d'un packaging et d'un déploiement de modèles en
           un clic, compatibles TensorFlow, PyTorch, Scikit-learn et plus.`,
          `Évaluation et benchmarking de l'outillage MLOps open source,
           construisant une expertise approfondie de l'écosystème ML
           infrastructure.`,
        ],
        tags: ["Python", "MLflow", "Seldon Core", "Kubernetes", "Docker", "GCP"],
      },
      {
        period: "Sept. 2017 — Juil. 2019",
        location: "Alger, Algérie",
        role: "Data Engineer",
        company: "BigMama Technology — Plateforme de monitoring santé",
        bullets: [
          `Conception et déploiement d'une
           <strong>plateforme temps réel de monitoring de la santé</strong>
           pour personnes âgées vivant seules — Akka, Spark, Kafka,
           Elasticsearch, Firebase. La haute disponibilité était un
           impératif humain, pas un nice-to-have d'ingénierie.`,
          `Développement d'un <strong>SDK Scala interne</strong> unifiant
           l'intégration de la stack (Firebase, Kafka, Akka), améliorant
           la cohérence sur plusieurs projets.`,
          `Contribution à la conception de systèmes distribués complexes
           bâtis sur le <strong>modèle acteur</strong>.`,
          `Mise en place de l'automatisation Ansible pour la
           configuration et la sécurisation de l'infrastructure interne.`,
        ],
        tags: ["Scala", "Akka", "Kafka", "Spark", "Elasticsearch", "Ansible"],
      },
    ],
  },

  skills: {
    label: "Compétences",
    title: "Mon stack technique",
    domains: [
      {
        name: "Data & Traitement",
        tags: ["PySpark", "Apache Spark", "Databricks", "Kafka", "Elasticsearch"],
      },
      {
        name: "Langages",
        tags: ["Python", "Scala", "SQL", "Shell"],
      },
      {
        name: "Cloud, DevOps & Infrastructure",
        tags: ["Docker", "Kubernetes", "Gitlab CI/CD", "Linux", "Proxmox", "AWS", "GCP"],
      },
      {
        name: "Bases de données & APIs",
        tags: ["MongoDB", "GraphQL", "Flask", "Django"],
      },
    ],
  },

  projects: {
    label: "Projets",
    title: "Ce que je construis pour le plaisir",
    items: [
      {
        year: "2025 — Présent · Projet personnel",
        name: "HomeLab",
        stack: ["Proxmox", "Ansible", "Python", "Linux"],
        desc: `Je rêvais d'un HomeLab depuis des années. L'an dernier je
          l'ai enfin construit, et c'est devenu mon projet préféré.
          <br /><br />
          C'est en partie une question de vie privée — je suis mal à
          l'aise avec la quantité de ma vie numérique qui tourne sur des
          infrastructures que je ne contrôle pas. Le self-hosting est ma
          réponse. C'est aussi une question d'indépendance — mes données
          et mes services existent parce que je les ai construits, pas
          parce qu'une entreprise a décidé de continuer à les offrir.
          <br /><br />
          Mais surtout, c'est mon laboratoire. Quand je veux comprendre
          une techno, je la déploie. Récemment, ça voulait dire faire
          tourner des <strong style="color: var(--cyan)">LLMs en
          local</strong> sur mon propre matériel. Une stratégie de
          sauvegarde 3-2-1 garde tout en sécurité. Infrastructure as code,
          reproductibilité, résilience — les mêmes principes qui
          comptent pour moi en pro, appliqués chez moi.`,
      },
      {
        year: "2018 · Projet universitaire",
        name: "Lecteur vidéo contrôlé par gestes",
        stack: ["Scala", "Akka", "Keras"],
        desc: `Un projet universitaire dont je reste fier — un lecteur
          vidéo entièrement contrôlé par gestes de la main, conçu comme
          une application réactive et complètement distribuée.
          <br /><br />
          Détection de gestes, logique de contrôle vidéo et UI tournaient
          chacun comme des
          <strong style="color: var(--cyan)">acteurs Akka</strong>
          indépendants communiquant en asynchrone. Akka Remote gérait la
          distribution entre composants. La reconnaissance de gestes
          elle-même était un réseau de neurones entraîné avec Keras.
          <br /><br />
          Ma première expérience à intégrer un modèle entraîné dans un
          pipeline applicatif en production. À l'époque je n'avais pas
          le vocabulaire pour appeler ça du MLOps — mais le cœur du
          problème était exactement ce sur quoi je passerais des années
          plus tard chez BigMama.`,
      },
    ],
  },

  education: {
    label: "Formation",
    title: "Parcours académique",
    items: [
      {
        degree: "Doctorat en Intelligence Artificielle",
        degreeNote: "en cours, à temps partiel",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Gestion des services de données en environnements multi-cloud",
        period: "2019 — Présent",
      },
      {
        degree: "Master en Intelligence Artificielle",
        degreeNote: "",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Projet de fin d'études : système de recommandation à base de graphes",
        period: "2017 — 2019",
      },
      {
        degree: "Licence en Informatique",
        degreeNote: "",
        school:
          "Université des Sciences et de la Technologie Houari Boumediène (USTHB)",
        note: "Projet de fin d'études : prédiction de relations entre services web avec Spark — en collaboration avec l'Université du Michigan, USA",
        period: "2014 — 2017",
      },
    ],
  },

  contact: {
    label: "Discutons",
    titleLead: "Restons en",
    titleAccent: "contact.",
    sub: `Ouvert aux opportunités Senior Data Engineer et Data Architect à
      Paris et au-delà. Toujours partant pour parler architecture data,
      MLOps ou systèmes distribués.`,
    emailLabel: "mohammedi.haroun@gmail.com",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
  },

  footer:
    "Haroune Mohammedi · Paris, France · Construit avec ♥ et beaucoup de café",
};
