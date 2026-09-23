import { NavScreen } from './types';
import { FAQ_ITEMS } from './data/content';

/** Domaine de production. À définir dans .env via VITE_SITE_URL. */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://jeece.iaelyonjuniorconseil.fr').replace(/\/$/, '');

export const PATHS: Record<NavScreen, string> = {
  accueil: '/',
  methodologie: '/methodologie',
  structures: '/structures',
  contact: '/contact',
};

/** Anciennes URL ou URL de campagne redirigées vers une page existante. */
const ALIASES: Record<string, NavScreen> = {
  '/diagnostic': 'contact',
  '/demarrer-un-diagnostic': 'contact',
};

export function screenFromPath(pathname: string): NavScreen {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (ALIASES[clean]) return ALIASES[clean];
  const match = (Object.keys(PATHS) as NavScreen[]).find((k) => PATHS[k] === clean);
  return match ?? 'accueil';
}

export const PAGE_SEO: Record<NavScreen, { title: string; description: string }> = {
  accueil: {
    title: 'Diagnostic & automatisation des processus | ILJC x JEECE',
    description:
      "IAE Lyon Junior Conseil et JEECE réunissent diagnostic organisationnel (audit SI, méthode ISEOR) et automatisation technique (scripts, IA) pour les PME. Réponse sous 24 h.",
  },
  methodologie: {
    title: 'Méthodologie : du diagnostic ISEOR à l’automatisation | ILJC x JEECE',
    description:
      'Les étapes d’une étude conjointe : analyse des processus, diagnostic SI et ISEOR, cartographie, puis automatisation, IA et déploiement technique par les ingénieurs JEECE.',
  },
  structures: {
    title: 'IAE Lyon Junior Conseil et JEECE, deux Junior-Entreprises du top 30',
    description:
      "Qui sont IAE Lyon Junior Conseil (Université Jean Moulin Lyon 3) et JEECE (école d'ingénieurs ECE) : histoire, chiffres, expertises, engagements qualité et coordonnées.",
  },
  contact: {
    title: 'Demander un diagnostic | ILJC x JEECE, Lyon et Paris',
    description:
      'Décrivez vos processus en 2 minutes : un chargé d’affaires ILJC et un chef de projet JEECE vous répondent sous 24 h. Audit SI, automatisation, IA, diagnostic ISEOR.',
  },
};

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Met à jour title, description, canonical et Open Graph à chaque changement de page. */
export function applySeo(screen: NavScreen) {
  const { title, description } = PAGE_SEO[screen];
  const url = `${SITE_URL}${PATHS[screen] === '/' ? '/' : PATHS[screen]}`;

  document.title = title;
  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', url);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

/** Données structurées FAQPage, injectées sur les pages qui affichent la FAQ. */
export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
