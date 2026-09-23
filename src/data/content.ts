import { ProcessStep, SynergyNode, SynergyBranch, CaseStudy, FaqItem, Structure } from '../types';

/* ------------------------------------------------------------------ */
/* Coordonnées officielles (sources : iaelyonjuniorconseil.fr, jeece.fr) */
/* ------------------------------------------------------------------ */

export const CONTACTS = {
  iljc: {
    name: 'IAE Lyon Junior Conseil',
    email: 'contact@iaelyonjuniorconseil.fr',
    phone: '04 78 78 73 50',
    phoneHref: 'tel:+33478787350',
  },
  jeece: {
    name: 'JEECE',
    email: 'contact@jeece.fr',
    phone: '01 81 51 15 56',
    phoneHref: 'tel:+33181511556',
  },
};

/* ------------------------------------------------------------------ */
/* Accueil                                                             */
/* ------------------------------------------------------------------ */

export const PROOF_FIGURES = [
  { value: 'L30', label: 'IAE Lyon Junior Conseil et JEECE figurent au classement des 30 meilleures Junior-Entreprises de France' },
  { value: '+800', label: 'clients signés par IAE Lyon Junior Conseil et JEECE' },
  { value: '40 ans', label: "d'ingénierie numérique et électronique chez JEECE, fondée en 1986" },
  { value: '24 h', label: 'pour obtenir une première réponse de nos chargés d’affaires' },
];

/** Les trois engagements (plaquette : Transition fluide, Gain de temps immédiat, Prestation clé en main). */
export const PILLARS = [
  {
    id: 'p1',
    label: 'Transition fluide',
    headline: 'Une seule équipe, du premier entretien à la mise en service.',
    text: "Le chargé d'affaires ILJC et le chef de projet JEECE se transmettent le dossier en atelier commun. Votre contexte n'est jamais réexpliqué.",
    proof: 'Passation structurée ILJC puis JEECE',
    color: '#3fae5a',
    tint: 'hover:bg-pastel-green/45',
  },
  {
    id: 'p2',
    label: 'Gain de temps immédiat',
    headline: 'Les tâches manuelles disparaissent dès la livraison.',
    text: 'Doublons, ressaisies, relances : nous automatisons en priorité ce qui coûte le plus d’heures à vos équipes chaque semaine.',
    proof: '−40 % de temps administratif sur nos cas PME',
    color: '#34465f',
    tint: 'hover:bg-pastel-slate/45',
  },
  {
    id: 'p3',
    label: 'Prestation clé en main',
    headline: "Du diagnostic à l'outil que vos équipes utilisent.",
    text: 'Cartographie, développement, documentation et formation sont compris dans la mission. Vous repartez autonome.',
    proof: 'Documentation et formation incluses',
    color: '#004aad',
    tint: 'hover:bg-pastel-blue/45',
  },
];

export const STUDY_FLOW = [
  {
    id: 'f1',
    name: 'Diagnostic ILJC',
    color: 'royal-blue',
    points: ['Diagnostic SI / ISEOR', 'Analyse processus / organisation', 'Cartographie et recommandations'],
    outcome: 'Une feuille de route concrète',
  },
  {
    id: 'f2',
    name: 'Transition structurée',
    color: 'primary-container',
    points: ['Transmission du diagnostic', 'Priorisation et cadrage de la solution technique'],
    outcome: 'Un plan technique actionnable',
  },
  {
    id: 'f3',
    name: 'Expertise technique JEECE',
    color: 'jeece',
    points: ['Automatisation', 'Implémentation d’IA', 'Déploiement technique'],
    outcome: 'Une solution fonctionnelle et adaptée',
  },
  {
    id: 'f4',
    name: 'Livraison',
    color: 'primary-container',
    points: ['Documentation claire', 'Formation rapide des équipes', 'Outil directement utilisable'],
    outcome: 'Une autonomie totale du client',
  },
];

export const DELIVERABLES = [
  {
    title: 'Cartographie et feuille de route',
    text: 'Visualisation des flux, des irritants et des recommandations adaptées à votre organisation.',
  },
  {
    title: 'Automatisations et scripts sur mesure',
    text: 'Suppression des tâches manuelles, réduction des erreurs de saisie, gain de temps mesurable.',
  },
  {
    title: 'Mini interface interne',
    text: 'Pilotage des données et suivi des nouveaux processus par vos équipes, sans dépendre de nous.',
  },
];

/** Cas du partenariat (plaquette commerciale ILJC x JEECE). */
export const FEATURED_CASE = {
  label: 'Cas client',
  title: 'PME de 40 collaborateurs',
  metric: '−40 %',
  metricLabel: 'de temps administratif',
  rows: [
    { label: 'Problème', text: 'Doublons, lenteurs administratives et tâches manuelles.', owner: 'neutre' as const },
    { label: 'Intervention ILJC', text: 'Diagnostic SI, cartographie et scoring des irritants.', owner: 'iljc' as const },
    { label: 'Passation', text: 'Sélection de 3 processus à automatiser.', owner: 'neutre' as const },
    { label: 'Intervention JEECE', text: 'Automatisation, synchronisation et implémentation, tableau de bord interne.', owner: 'jeece' as const },
  ],
  result: 'Réduction du temps de saisie et fluidité retrouvée sur l’ensemble de la chaîne administrative.',
};

/** Références publiées par IAE Lyon Junior Conseil sur iaelyonjuniorconseil.fr. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'logpartenaire',
    label: 'Systèmes d’information',
    client: 'LogPartenaire, logistique et organisation des transports',
    objective:
      "Analyser les pôles Logistique, Transport et Finance pour comprendre leurs interactions, identifier les freins à la performance et repérer les leviers d'automatisation.",
    approach:
      "Guide d'entretien, puis audit des trois pôles par observation et échanges. Cartographie des méthodes de travail, évaluation de l'usage des outils, détection des tâches répétitives, actions hiérarchisées par impact et rapidité de mise en œuvre.",
    result:
      'Une feuille de route priorisée pour simplifier les processus, fluidifier la coordination entre services et développer l’automatisation, partagée par la direction et les équipes.',
  },
  {
    id: 'cabinet-gt',
    label: 'Diagnostic socio-économique ISEOR',
    client: 'Cabinet d’avocats GT, 4 personnes',
    objective:
      'Identifier les dysfonctionnements d’organisation interne, réduire les coûts cachés et améliorer la qualité de vie au travail.',
    approach:
      'Entretiens avec toute l’équipe, évaluation du temps perdu et du coût des dysfonctionnements, restitution collective puis séances d’accompagnement à la mise en œuvre.',
    result:
      'Coûts cachés réduits d’environ 20 %, communication fluidifiée et organisation interne clarifiée.',
  },
];

/* ------------------------------------------------------------------ */
/* FAQ (accueil + contact, balisée en FAQPage pour le SEO et le GEO)    */
/* ------------------------------------------------------------------ */

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Que propose le partenariat IAE Lyon Junior Conseil x JEECE ?',
    answer:
      "Une prestation clé en main en deux temps. IAE Lyon Junior Conseil réalise le diagnostic organisationnel (analyse des processus, audit SI, méthode ISEOR, cartographie et recommandations). JEECE, Junior-Entreprise d'ingénieurs de l'ECE, met ensuite en place les solutions techniques : automatisations, intelligence artificielle et déploiement. Le client garde un seul fil conducteur, du diagnostic à l'outil livré.",
  },
  {
    question: 'Qu’est-ce que la méthode ISEOR ?',
    answer:
      "ISEOR est une méthode de management socio-économique. IAE Lyon Junior Conseil l'applique en partenariat avec l'ISEOR pour révéler les coûts cachés d'une organisation (absentéisme, turnover, dysfonctionnements, temps perdu), que l'ISEOR estime entre 20 000 et 70 000 € par personne et par an, puis les convertir en leviers de performance.",
  },
  {
    question: 'Qu’est-ce qu’une Junior-Entreprise ?',
    answer:
      "Une association loi 1901 à vocation pédagogique, implantée dans un établissement d'enseignement supérieur, qui réalise des missions pour des organisations en mobilisant ses étudiants. Le mouvement rassemble plus de 200 structures en France, encadrées et auditées par la Confédération Nationale des Junior-Entreprises (CNJE).",
  },
  {
    question: 'Quels processus peut-on automatiser ?',
    answer:
      'Les tâches répétitives, chronophages et à faible valeur ajoutée : ressaisie de données entre logiciels, traitement de documents, génération de devis ou de rapports, synchronisation d’outils, suivi de tableaux de bord. Le diagnostic mesure le temps passé sur chaque tâche, sa fréquence et les outils utilisés pour cibler les automatisations les plus rentables.',
  },
  {
    question: 'Qui pilote mon projet ?',
    answer:
      'Un chargé d’affaires ILJC suit la phase de diagnostic, puis un chef de projet JEECE dédié coordonne la phase technique. Les deux équipes se transmettent le dossier lors d’une passation structurée, ce qui évite de réexpliquer votre contexte.',
  },
  {
    question: 'Mes données restent-elles confidentielles ?',
    answer:
      'Oui. Les informations échangées pendant la mission sont protégées et peuvent être encadrées par un accord de confidentialité. Chaque livrable fait l’objet d’une relecture interne avant remise.',
  },
  {
    question: 'Pouvez-vous intervenir sur un projet déjà engagé ?',
    answer:
      'Oui. Nous pouvons intervenir à différentes étapes : audit d’un existant, reprise d’une automatisation, développement complémentaire ou accompagnement d’une phase précise.',
  },
  {
    question: 'Dans quelles villes intervenez-vous ?',
    answer:
      'IAE Lyon Junior Conseil est basée à Lyon (Université Jean Moulin Lyon 3). JEECE est implantée à Paris et à Lyon. Les missions se déroulent sur site ou à distance, partout en France.',
  },
];

/* ------------------------------------------------------------------ */
/* Structures (sources : iaelyonjuniorconseil.fr, jeece.fr)             */
/* ------------------------------------------------------------------ */

export const STRUCTURES: Structure[] = [
  {
    id: 'iljc',
    name: 'IAE Lyon Junior Conseil',
    shortName: 'ILJC',
    legalLine: 'Association loi 1901, RNA W691077400',
    founded: '2010',
    school: 'iaelyon School of Management, Université Jean Moulin Lyon 3',
    website: 'https://iaelyonjuniorconseil.fr',
    intro: [
      "IAE Lyon Junior Conseil est la Junior-Entreprise de l'iaelyon School of Management, l'école de management de l'Université Jean Moulin Lyon 3. Fondée en 2010, c'est une association pédagogique qui fonctionne sur le modèle d'un cabinet de conseil : elle réalise des études pour des entreprises, des créateurs et des organisations publiques, en mobilisant les étudiants de l'université.",
      "Elle se présente comme la première Junior-Entreprise des IAE de France et a intégré la L30, le classement des 30 meilleures Junior-Entreprises françaises. En 2019, elle a fondé le regroupement des JIAE, les Junior-Entreprises issues des IAE.",
      "Outre son équipe de gestion, l'association recrute pour chaque mission les étudiants dont les compétences correspondent au besoin du client. La diversité des enseignements de Lyon 3 lui permet de couvrir la gestion, le marketing, la finance, les ressources humaines, les achats, le droit et les systèmes d'information.",
    ],
    facts: [
      { value: '2010', label: 'année de création' },
      { value: 'L30', label: 'top 30 des Junior-Entreprises de France' },
      { value: '+800', label: 'clients signés' },
      { value: '99 %', label: 'de satisfaction client' },
      { value: '+28 000', label: 'étudiants à l’Université Lyon 3' },
      { value: '3e', label: 'place Eduniversal du Master MSI (informatique, IA et big data)' },
    ],
    expertises: [
      {
        title: 'Systèmes d’information',
        text: "Audit préalable à un projet d'automatisation ou d'IA : collecte des données sur les processus (temps par tâche, fréquence, outils), repérage des tâches à fort potentiel d'automatisation, plan d'action priorisé.",
      },
      {
        title: 'Diagnostic socio-économique ISEOR',
        text: "En partenariat avec l'ISEOR, analyse des dysfonctionnements, de l'absentéisme ou du turnover pour révéler et réduire les coûts cachés de l'organisation.",
      },
      {
        title: 'Achats',
        text: "Évaluation des besoins, sourcing et sélection de fournisseurs, gestion d'appels d'offres, négociation et suivi de la performance fournisseurs.",
      },
      {
        title: 'Ressources humaines',
        text: 'Études de climat social et de satisfaction, marque employeur, recrutement de jeunes diplômés parmi les étudiants de Lyon 3.',
      },
      {
        title: 'Droit et dérisquage',
        text: 'Veille juridique et réglementaire, recherches de jurisprudence, modèles d’actes, analyse des opportunités et menaces à l’international.',
      },
      {
        title: 'Stratégie et marketing',
        text: 'Études de marché, concurrentielles, de notoriété et d’image, études de faisabilité et d’implantation, business plans, plans de communication, audit RSE, traduction.',
      },
    ],
    quality: [
      'Réponse sous 24 h par un chargé d’affaires',
      'Méthodologie rigoureuse et respect des délais',
      'Livrables clairs, fiables et exploitables',
      'Missions encadrées avec un suivi qualité et de confidentialité',
    ],
    partnersLabel: 'Partenaires',
    partners: ['ISEOR', 'JEECE', 'PwC', 'Mantu', 'Training You', 'Dérisqueur'],
    offices: [{ city: 'Lyon', address: 'iaelyon School of Management, 6 cours Albert Thomas, 69008 Lyon' }],
    email: 'contact@iaelyonjuniorconseil.fr',
    phone: '04 78 78 73 50',
    phoneHref: 'tel:+33478787350',
  },
  {
    id: 'jeece',
    name: 'JEECE',
    shortName: 'JEECE',
    legalLine: 'Junior Étude de l’ECE, association loi 1901, SIREN 340 555 283',
    founded: '1986',
    school: 'ECE, école d’ingénieurs (campus de Paris et de Lyon)',
    website: 'https://www.jeece.fr',
    intro: [
      "JEECE est la Junior-Entreprise de l'ECE, école d'ingénieurs généraliste fondée en 1919 et reconnue pour sa formation en électronique, informatique et systèmes. Spécialisée dans les technologies du numérique, elle accompagne depuis 1986 les entreprises dans leurs projets techniques, du prototypage à l'industrialisation.",
      "Fondée sous le nom de Hi-Tech par Bruno Delanef, parmi les premières Junior-Entreprises du réseau ingénieur, elle prend le nom de JEECE en 2007, s'implante à Lyon en 2021 et noue en 2025 son partenariat avec IAE Lyon Junior Conseil.",
      "Les étudiants de JEECE s'appuient sur l'environnement technique de l'ECE, qui a créé le premier Intelligence Lab de France dédié à l'IA générative, et sur son FabLab, auquel JEECE a un accès privilégié.",
    ],
    facts: [
      { value: '1986', label: 'année de création' },
      { value: '40 ans', label: 'd’expérience' },
      { value: '14 ans', label: 'dans le top 30 des Junior-Entreprises' },
      { value: '+4 400', label: 'intervenants mobilisables' },
      { value: '96 %', label: 'de satisfaction client' },
      { value: '12', label: 'spécialisations du programme ingénieur ECE' },
    ],
    expertises: [
      {
        title: 'Électronique',
        text: 'Systèmes embarqués, objets connectés (IoT), conception de cartes électroniques et de prototypes.',
      },
      {
        title: 'Digital',
        text: 'Sites web, applications, outils de gestion internes, automatisation de processus et optimisation des systèmes d’information.',
      },
      {
        title: 'Data et IA',
        text: 'Extraction et traitement de données, intégration de l’intelligence artificielle dans vos outils, y compris sur du matériel électronique.',
      },
      {
        title: 'Conseil',
        text: 'Cadrage technique, audit d’un existant, reprise ou accompagnement d’un projet déjà engagé.',
      },
    ],
    quality: [
      'Un chef de projet dédié, interlocuteur unique pendant la mission',
      'Relecture interne de chaque livrable avant remise',
      'Cadre de gestion de projet inspiré des normes ISO et du référentiel qualité CNJE',
      'Informations protégées, accord de confidentialité possible',
    ],
    partnersLabel: 'Ils lui ont confié des projets',
    partners: ['Armée de Terre', 'Thales', 'SNCF', 'CMA CGM', 'Bpifrance', 'EDF', 'L’Oréal', 'Air Liquide', 'Hachette Livre', 'Cegedim'],
    offices: [
      { city: 'Paris', address: '10 rue Sextius Michel, 75015 Paris' },
      { city: 'Lyon', address: '6 rue Bonnefoi, 69003 Lyon' },
    ],
    email: 'contact@jeece.fr',
    phone: '01 81 51 15 56',
    phoneHref: 'tel:+33181511556',
  },
];

export const JE_MOVEMENT = {
  title: 'Le mouvement des Junior-Entreprises',
  text: [
    "Les Junior-Entreprises sont des associations étudiantes à vocation pédagogique, implantées dans les écoles et universités. Le mouvement réunit plus de 200 structures dans plus de 85 villes françaises et environ 25 000 étudiants.",
    "La Confédération Nationale des Junior-Entreprises (CNJE) encadre le réseau : elle suit et audite chaque structure pour garantir la qualité, le professionnalisme et le sérieux de l'accompagnement proposé aux clients.",
  ],
};

/* ------------------------------------------------------------------ */
/* Méthodologie : données conservées à l'identique                     */
/* ------------------------------------------------------------------ */

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step1',
    name: 'Diagnostic ILJC',
    structure: 'ILJC',
    color: '#0056B3', // royal blue
    summary: 'Une feuille de route concrète',
    details: [
      'Immersion au cœur de vos équipes et observation terrain',
      'Cartographie détaillée des processus métiers et flux documentaires',
      'Identification exhaustive des points de friction et des doublons',
      'Évaluation de la maturité digitale et calcul des coûts cachés'
    ],
    deliverables: [
      'Rapport d’audit organisationnel complet',
      'Cartographie des processus (norme BPMN)',
      'Matrice d’opportunités d’automatisation priorisées'
    ]
  },
  {
    id: 'step2',
    name: 'Transition Structurée',
    structure: 'Transition',
    color: '#43474d', // on-surface-variant
    summary: 'Un plan technique actionnable',
    details: [
      'Atelier tripartite de passation : Client, Consultants ILJC et Ingénieurs JEECE',
      'Traduction des besoins stratégiques en spécifications fonctionnelles et techniques',
      'Choix des briques logicielles (No-Code, Low-Code ou Full-Code sur-mesure)',
      'Définition précise du planning, des jalons et des indicateurs de réussite'
    ],
    deliverables: [
      'Cahier des charges fonctionnel et technique',
      'Schéma d’architecture logicielle et flux de données',
      'Convention de prestation conjointe validée'
    ]
  },
  {
    id: 'step3',
    name: 'Expertise Technique JEECE',
    structure: 'JEECE',
    color: '#006e28', // tech green
    summary: 'Une solution fonctionnelle',
    details: [
      'Développement de scripts d’automatisation (Python, API REST, Webhooks)',
      'Configuration de plateformes d’orchestration (Make, n8n, Zapier) ou RPA',
      'Interconnexion sécurisée de vos outils existants (ERP, CRM, Slack, Google/Microsoft)',
      'Batterie de tests d’intégration, vérification de la robustesse et conformité RGPD'
    ],
    deliverables: [
      'Environnement d’automatisation déployé et sécurisé',
      'Code source documenté et accessible',
      'Tableaux de bord de monitoring des flux'
    ]
  },
  {
    id: 'step4',
    name: 'Livraison & Autonomie',
    structure: 'Livraison',
    color: '#001629', // deep navy
    summary: 'Une autonomie totale du client',
    details: [
      'Recette finale conjointe et mise en production surveillée',
      'Sessions de formation interactive pour vos collaborateurs utilisateurs',
      'Remise de guides d’utilisation clairs et de fiches de maintenance',
      'Période de garantie et d’assistance post-livraison'
    ],
    deliverables: [
      'Guide utilisateur et documentation technique exhaustive',
      'Sessions d’onboarding enregistrées pour vos équipes',
      'Garantie opérationnelle de bon fonctionnement'
    ]
  }
];

export const SYNERGY_BRANCHES: SynergyBranch[] = [
  { badge: 'IAE LYON JUNIOR CONSEIL', title: 'Le diagnostic opérationnel', color: '#0056B3' },
  { badge: 'JEECE', title: "L'expertise technique", color: '#006e28' },
];

export const SYNERGY_NODES: SynergyNode[] = [
  {
    id: 'sn1',
    owner: 'ILJC',
    side: 'right',
    title: 'Analyse des processus',
    tagline: 'Comprendre où le temps se perd',
    description:
      "Nous suivons vos flux réels, service par service, pour mesurer ce que coûtent vraiment les tâches répétitives.",
    points: [
      'Entretiens terrain et observation des postes de travail',
      'Relevé des tâches manuelles, doublons et ressaisies',
      'Chiffrage des heures perdues chaque semaine',
    ],
    deliverable: 'Carte des irritants chiffrée',
    icon: 'search',
    color: '#0056B3',
  },
  {
    id: 'sn2',
    owner: 'ILJC',
    side: 'left',
    title: 'Diagnostic SI / ISEOR',
    tagline: 'Mesurer les coûts cachés',
    description:
      "La méthode ISEOR appliquée à votre système d'information : on met un montant sur les dysfonctionnements que personne ne comptabilise.",
    points: [
      'Audit des outils en place (ERP, CRM, tableurs, boîtes mail)',
      'Évaluation des coûts cachés selon la grille ISEOR',
      'Repérage des ruptures entre vos logiciels',
    ],
    deliverable: 'Audit SI et coûts cachés',
    icon: 'insights',
    color: '#0056B3',
  },
  {
    id: 'sn3',
    owner: 'ILJC',
    side: 'right',
    title: 'Cartographie & recommandations',
    tagline: 'Savoir par quoi commencer',
    description:
      "Vos processus sont mis à plat, puis les chantiers d'automatisation sont classés par gain attendu et par effort de mise en œuvre.",
    points: [
      'Cartographie des processus clés (norme BPMN)',
      'Scoring des irritants par impact et par fréquence',
      "Feuille de route priorisée sur 3 à 6 mois",
    ],
    deliverable: 'Feuille de route priorisée',
    icon: 'account_tree',
    color: '#0056B3',
  },
  {
    id: 'sn4',
    owner: 'JEECE',
    side: 'left',
    title: 'Automatisations',
    tagline: 'Supprimer la saisie manuelle',
    description:
      'Les tâches repérées pendant le diagnostic deviennent des traitements qui tournent seuls, connectés à vos outils actuels.',
    points: [
      'Scripts sur mesure et connexions API entre logiciels',
      'Scénarios orchestrés sous Make ou n8n',
      'Synchronisation de vos données sans double saisie',
    ],
    deliverable: 'Automatisations en production',
    icon: 'bolt',
    color: '#006e28',
  },
  {
    id: 'sn5',
    owner: 'JEECE',
    side: 'right',
    title: 'Intelligence artificielle',
    tagline: 'Traiter ce qui demandait une relecture',
    description:
      "Lecture de documents, classement, rédaction de réponses : l'IA prend en charge les traitements qui mobilisaient un collaborateur.",
    points: [
      'Extraction automatique des données de vos PDF et e-mails',
      'Classement et routage des demandes entrantes',
      'Modèles ajustés à votre vocabulaire métier',
    ],
    deliverable: 'Brique IA intégrée à vos outils',
    icon: 'neurology',
    color: '#006e28',
  },
  {
    id: 'sn6',
    owner: 'JEECE',
    side: 'left',
    title: 'Déploiement technique',
    tagline: 'Livrer un outil utilisable',
    description:
      'Mise en production, tests et formation : vos équipes repartent autonomes, avec la documentation entre les mains.',
    points: [
      "Recette conjointe et tests d'intégration",
      'Tableau de bord de suivi interne',
      'Formation des équipes et documentation claire',
    ],
    deliverable: 'Outil utilisable dès le jour J',
    icon: 'rocket_launch',
    color: '#006e28',
  },
];
