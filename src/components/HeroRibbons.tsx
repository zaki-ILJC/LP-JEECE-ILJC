import React, { useEffect, useRef, useState } from 'react';
import { NavScreen } from '../types';
import { NavLink } from './Brand';
import { ArrowRight } from 'lucide-react';

interface HeroRibbonsProps {
  onNavigate: (screen: NavScreen) => void;
}

/**
 * Légende accrochée à un brin du ruban. Les coordonnées (en % de l'image)
 * ont été relevées sur le fichier : x/y tombent au sommet du brin concerné.
 */
const Callout: React.FC<{
  x: number;
  y: number;
  color: string;
  name: string;
  role: string;
  align: 'left' | 'right';
  delay: string;
}> = ({ x, y, color, name, role, align, delay }) => (
  <div
    className="hero-callout absolute hidden lg:block"
    style={{ left: `${x}%`, top: `${y}%`, animationDelay: delay }}
  >
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white"
      style={{ boxShadow: `0 0 0 3px ${color}` }}
    />
    <span className="absolute -translate-x-1/2 bottom-[10px] h-12 w-px" style={{ backgroundColor: color }} />
    <span
      className={`absolute bottom-[58px] whitespace-nowrap bg-white px-3 py-2 border-l-4 ${align === 'right' ? 'right-[-2px]' : 'left-[-2px]'}`}
      style={{ borderColor: color }}
    >
      <span className="block font-display text-[15px] font-bold text-primary leading-tight">{name}</span>
      <span className="block text-[13px] text-on-surface-variant leading-tight mt-0.5">{role}</span>
    </span>
  </div>
);

export const HeroRibbons: React.FC<HeroRibbonsProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  // Parallaxe légère : le ruban descend un peu moins vite que la page.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = sectionRef.current?.offsetHeight ?? 900;
        const y = Math.min(window.scrollY, h);
        setOffset(y * 0.18);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-white">
      {/* Ruban en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0
          left-[-32%] right-[-32%] bottom-[-3vw]
          sm:left-[-12%] sm:right-[-18%]
          lg:left-auto lg:bottom-auto lg:right-[-12%] lg:top-[30%] lg:w-[66%]
          xl:right-[-8%] xl:top-[21%] xl:w-[70%] xl:max-w-[1180px]"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <div className="hero-ribbon">
          <div className="hero-float relative">
            <img
              src="/ruban-duo.webp"
              srcSet="/ruban-duo-900.webp 900w, /ruban-duo.webp 1376w"
              sizes="(min-width: 1024px) 70vw, 160vw"
              width={1376}
              height={666}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="hero-ribbon-img block w-full h-auto select-none"
            />
            <Callout x={79.4} y={14.5} color="#004aad" name="IAE Lyon Junior Conseil" role="le diagnostic" align="right" delay="1.1s" />
            <Callout x={54.4} y={43} color="#1d7a3b" name="JEECE" role="la solution technique" align="left" delay="1.35s" />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10 flex flex-col pt-14 md:pt-20 pb-[76vw] sm:pb-[52vw] lg:pb-28 xl:min-h-[calc(100svh-68px)] xl:max-h-[940px]">
        <div className="flex flex-col gap-7 max-w-[640px] xl:max-w-[660px]">
          <p className="hero-rise text-[15px] font-medium text-on-surface-variant" style={{ animationDelay: '0.05s' }}>
            Partenariat IAE Lyon Junior Conseil <span className="text-outline">x</span> JEECE
          </p>

          <h1 className="hero-rise section-title text-[40px] sm:text-[54px] lg:text-[60px] xl:text-[66px]" style={{ animationDelay: '0.12s' }}>
            <span className="text-royal-blue">Diagnostic</span> &amp;{' '}
            <span className="text-secondary">automatisation</span> : une solution clé en&nbsp;main
          </h1>

          <p className="hero-rise text-lg md:text-xl leading-relaxed text-on-surface-variant max-w-[52ch]" style={{ animationDelay: '0.2s' }}>
            IAE Lyon Junior Conseil identifie les points de friction de votre organisation, JEECE met en place les
            solutions techniques. Audit des processus et du système d'information, puis automatisations et
            intelligence artificielle intégrées à vos outils, pour les PME de Lyon, de Paris et de toute la France.
          </p>

          <div className="hero-rise flex flex-col sm:flex-row sm:items-center gap-4 pt-1" style={{ animationDelay: '0.28s' }}>
            <NavLink
              to="contact"
              onNavigate={onNavigate}
              className="group inline-flex items-center justify-center gap-2 bg-secondary hover:bg-[#166531] text-white font-medium px-6 py-4 rounded-md transition-colors"
            >
              Démarrer un diagnostic
              <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" />
            </NavLink>
            <NavLink
              to="methodologie"
              onNavigate={onNavigate}
              className="self-start sm:self-auto bg-white/80 text-primary font-medium underline decoration-jeece decoration-2 underline-offset-[6px] hover:decoration-royal-blue py-1"
            >
              Voir le déroulé d'une étude
            </NavLink>
          </div>

          <p className="hero-rise text-sm text-on-surface-variant" style={{ animationDelay: '0.34s' }}>
            Réponse sous 24 h. Premier échange sans engagement.
          </p>
        </div>
      </div>
    </section>
  );
};
