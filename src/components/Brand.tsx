import React, { useState } from 'react';
import { NavScreen } from '../types';
import { PATHS } from '../seo';

/* ------------------------------------------------------------------ */
/* Lien interne : vraie balise <a href> (indexable) + navigation SPA    */
/* ------------------------------------------------------------------ */

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, onNavigate, children, onClick, ...rest }) => (
  <a
    href={PATHS[to]}
    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      onNavigate(to);
    }}
    {...rest}
  >
    {children}
  </a>
);

/* ------------------------------------------------------------------ */
/* Logos : fichiers officiels dans /public/logos, repli typographique   */
/* ------------------------------------------------------------------ */

const LogoImage: React.FC<{ src: string; alt: string; className?: string; fallback: React.ReactNode }> = ({
  src,
  alt,
  className,
  fallback,
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" decoding="async" />;
};

export const IljcLogo: React.FC<{ tone?: 'dark' | 'light'; className?: string }> = ({ tone = 'dark', className = 'h-8 w-auto' }) => (
  <LogoImage
    src={tone === 'light' ? '/logos/iljc-blanc.webp' : '/logos/iljc.webp'}
    alt="IAE Lyon Junior Conseil"
    className={className}
    fallback={
      <span className="inline-flex flex-col leading-none" aria-label="IAE Lyon Junior Conseil">
        <span className={`font-condensed text-[26px] ${tone === 'light' ? 'text-white' : 'text-primary'}`}>IAE LYON</span>
        <span className={`font-body text-[10px] font-medium tracking-wide ${tone === 'light' ? 'text-white/80' : 'text-sky'}`}>
          JUNIOR CONSEIL
        </span>
      </span>
    }
  />
);

/** Chemins explicites : facilite le remplacement des fichiers et l'analyse statique. */
const JEECE_SRC = {
  lockup: { dark: '/logos/jeece-h.webp', light: '/logos/jeece-h-blanc.webp' },
  full: { dark: '/logos/jeece.webp', light: '/logos/jeece-blanc.webp' },
  wordmark: { dark: '/logos/jeece-mot.webp', light: '/logos/jeece-mot-blanc.webp' },
};

/**
 * JEECE : verrouillage horizontal (symbole + mot) par défaut, pour rester lisible
 * en petit à côté du logo ILJC ; logo complet empilé pour les pages de présentation.
 */
export const JeeceLogo: React.FC<{ tone?: 'dark' | 'light'; variant?: 'lockup' | 'wordmark' | 'full'; className?: string }> = ({
  tone = 'dark',
  variant = 'lockup',
  className = 'h-8 w-auto',
}) => (
  <LogoImage
    src={JEECE_SRC[variant][tone]}
    alt="JEECE, Junior-Entreprise de l'ECE"
    className={className}
    fallback={
      <span className="font-display text-[22px] font-extrabold leading-none tracking-tight" aria-label="JEECE">
        <span className="text-jeece">JE</span>
        <span className={tone === 'light' ? 'text-white' : 'text-primary'}>ECE</span>
      </span>
    }
  />
);

export const Lockup: React.FC<{ tone?: 'dark' | 'light'; size?: 'sm' | 'lg' }> = ({ tone = 'dark', size = 'sm' }) => (
  <span className="inline-flex items-center gap-3 md:gap-4">
    <IljcLogo tone={tone} className={size === 'lg' ? 'h-12 lg:h-14 w-auto' : 'h-8 w-auto'} />
    <span className={`font-condensed ${size === 'lg' ? 'text-3xl' : 'text-lg'} ${tone === 'light' ? 'text-white/70' : 'text-outline'}`}>
      X
    </span>
    <JeeceLogo tone={tone} className={size === 'lg' ? 'h-12 lg:h-14 w-auto' : 'h-8 w-auto'} />
  </span>
);

/* ------------------------------------------------------------------ */
/* Motifs de la plaquette                                              */
/* ------------------------------------------------------------------ */

/** Aplat navy traversé par deux bandes diagonales verte et bleue (couverture de plaquette). */
export const DiagonalBands: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 600 420"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="600" height="420" fill="#34465f" />
    <polygon points="0,0 600,0 600,20 0,260" fill="#ffffff" />
    <polygon points="0,300 600,60 600,100 0,340" fill="#3fae5a" />
    <polygon points="0,340 600,100 600,140 0,380" fill="#004aad" />
  </svg>
);

/** Éclats géométriques bleu ciel / navy / bleu du coin supérieur droit de la plaquette. */
export const CornerShards: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
    <polygon points="70,0 220,0 220,40 150,58" fill="#46b1e5" />
    <polygon points="170,62 220,48 220,70 184,80" fill="#1f2d44" />
    <polygon points="118,110 220,74 220,150" fill="#004aad" />
  </svg>
);
