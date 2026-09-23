# Mise en ligne sur jeece.iaelyonjuniorconseil.fr

Le nom de domaine reste chez OVH. Seul un enregistrement CNAME y est ajouté pour le
sous-domaine `jeece`. Le code vit sur GitHub, qui republie le site à chaque modification.

## 1. Envoyer le code sur GitHub

```bash
cd <dossier-du-projet>
git init
git add .
git commit -m "Site ILJC x JEECE"
git branch -M main
git remote add origin https://github.com/<compte>/<depot>.git
git push -u origin main
```

Le fichier `.env` reste local : il est exclu par `.gitignore`.

## 2. Activer GitHub Pages

1. Dépôt → Settings → Pages → Source : **GitHub Actions**.
   Le fichier `.github/workflows/deploy.yml` prend le relais à chaque envoi sur `main`.
2. Settings → Secrets and variables → Actions :
   - variable `VITE_SITE_URL` = `https://jeece.iaelyonjuniorconseil.fr`
   - secret `VITE_LEAD_WEBHOOK_URL` = l'URL n8n qui reçoit le formulaire
3. Settings → Pages → Custom domain : `jeece.iaelyonjuniorconseil.fr`, puis cocher
   *Enforce HTTPS* une fois le certificat délivré (quelques minutes à quelques heures).

Le fichier `public/CNAME` contient déjà le sous-domaine : GitHub le retrouve à chaque
publication, la configuration n'est donc jamais perdue.

## 3. Le CNAME chez OVH

Espace client OVH → Noms de domaine → `iaelyonjuniorconseil.fr` → Zone DNS → Ajouter une entrée :

| Champ        | Valeur                  |
| ------------ | ----------------------- |
| Type         | CNAME                   |
| Sous-domaine | `jeece`                 |
| Cible        | `<compte>.github.io.`   |

Le point final fait partie de la valeur. Si une entrée A ou CNAME existe déjà pour
`jeece`, la supprimer d'abord : une seule entrée par sous-domaine.

Le site principal `iaelyonjuniorconseil.fr` n'est pas touché.

## 4. Vérifier après la mise en ligne

- Ouvrir les quatre URL : `/`, `/methodologie`, `/structures`, `/contact`.
- Déclarer le site dans Google Search Console et y envoyer `sitemap.xml`.
- Ajouter `public/og-image.png` (1200 x 630) pour les aperçus de liens.

### Le point à surveiller pour le référencement

Chaque page a sa propre URL. GitHub Pages ne sait pas réécrire ces adresses : il sert
`404.html` (une copie de la page d'accueil, créée automatiquement au build). L'affichage
est correct, mais le serveur répond « 404 », et Google peut alors ignorer ces pages.

Si l'indexation de `/methodologie`, `/structures` et `/contact` compte, deux solutions,
sans changer le CNAME OVH ni quitter GitHub :

- **Cloudflare Pages** ou **Netlify** connectés au même dépôt. Le fichier
  `public/_redirects` fourni fait répondre 200 sur toutes les URL. Il suffit alors de
  pointer le CNAME OVH vers l'adresse fournie par l'hébergeur au lieu de `github.io`.
- **Pré-rendu statique** : générer un vrai fichier HTML par page au build
  (`vite-react-ssg` ou équivalent). Le site reste sur GitHub Pages.

## 5. Modifier le site ensuite

```bash
git pull
# modifications
npm run dev      # vérification sur http://localhost:3000
git add .
git commit -m "Description"
git push
```

La republication prend une à deux minutes. Pour une correction de texte, l'édition
directe du fichier sur github.com déclenche le même déploiement.

## 6. Travailler avec Claude sur le site

**Claude Code, en local.** Installer Node.js 18 ou plus, puis :

```bash
npm install -g @anthropic-ai/claude-code
cd <dossier-du-projet>
claude
```

Claude lit le projet, modifie les fichiers, lance `npm run dev` et prépare les commits.
Documentation : https://docs.claude.com/en/docs/claude-code/overview

**Claude directement sur GitHub.** Depuis Claude Code, lancer `/install-github-app`.
L'assistant installe l'application GitHub et les secrets nécessaires. Ensuite, mentionner
`@claude` dans une issue ou une pull request suffit : Claude analyse la demande, pousse
une branche et ouvre une pull request. Le déploiement se fait à la fusion.

Un fichier `CLAUDE.md` à la racine du dépôt sert à consigner les règles du projet
(charte graphique, conventions, ce qu'il ne faut pas modifier).
