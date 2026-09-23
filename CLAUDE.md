# Repères pour travailler sur ce site

Landing page du partenariat IAE Lyon Junior Conseil (ILJC) x JEECE.
Objectif : convertir le trafic Google Ads en demandes via le formulaire de contact.

## Technique
- React 19 + TypeScript + Vite + Tailwind v4 (thème dans `src/index.css`, pas de fichier de config).
- Navigation par URL sans bibliothèque de routage : `src/seo.ts` et `src/App.tsx`.
  Ajouter une page implique de mettre à jour `PATHS`, `PAGE_SEO`, `public/sitemap.xml` et `public/llms.txt`.
- Vérification avant commit : `npm run lint` (tsc) puis `npm run build`.

## Contenu
- Tous les textes et données vivent dans `src/data/content.ts`.
- Les chiffres et références proviennent des sites officiels des deux structures.
  Ne pas inventer de statistique, de cas client ni de ROI.

## Design
- Charte issue de la plaquette commerciale : navy ardoise `#34465f`, bleu IAE `#004aad`,
  bleu ciel `#46b1e5`, vert JEECE `#3fae5a`, vert foncé `#1d7a3b` pour les boutons et le texte.
- Typographies : League Spartan (titres), Lexend (textes), Bebas Neue (chevrons).
- À éviter : dégradés, flous, halos, pastilles d'icônes, boutons en pilule, tirets cadratins.
- Motifs de marque : chevrons, bandes diagonales, trait pointillé à pastilles, cartes à cadre coloré.

## Conversion
- Un seul objectif : le formulaire `/contact`. Ne pas ajouter de lien sortant vers les sites
  institutionnels des deux structures.
- Le formulaire envoie vers `VITE_LEAD_WEBHOOK_URL` (n8n) et déclenche `gtag('generate_lead')`.

## Accessibilité
- Contraste AA, focus visible, `prefers-reduced-motion` respecté.
