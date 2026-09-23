import React from 'react';
import { NavScreen } from '../types';
import { PILLARS, CONTACTS } from '../data/content';
import { NavLink, IljcLogo, JeeceLogo } from './Brand';
import { HeroRibbons } from './HeroRibbons';
import { ProofFigures } from './ProofFigures';
import { StudyFlowSection } from './StudyFlowSection';
import { DeliverablesCase } from './DeliverablesCase';
import { EngagementGlyph } from './EngagementGlyph';
import { FaqList } from './FaqList';
import { ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (screen: NavScreen) => void;
}

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-[1200px] mx-auto px-5 md:px-8 ${className}`}>{children}</div>
);

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const branches = [
    { logo: <IljcLogo tone="light" className="h-9 w-auto" />, title: 'Le diagnostic opérationnel', items: ['Analyse des processus', 'Diagnostic SI / ISEOR', 'Cartographie & recommandations'], dot: '#46b1e5', text: '#7cc8ee' },
    { logo: <JeeceLogo tone="light" className="h-9 w-auto" />, title: "L'expertise technique", items: ['Automatisations', 'Intelligence artificielle', 'Déploiement technique'], dot: '#3fae5a', text: '#6fcb86' },
  ];

  return (
    <>
      {/* Hero : rubans bleu (ILJC) et vert (JEECE) tressés */}
      <HeroRibbons onNavigate={onNavigate} />

      {/* Chiffres clés (sources : sites officiels), animés à l'entrée dans l'écran */}
      <ProofFigures />

      {/* Le partenariat : aplat navy de la plaquette, bandes diagonales en coin */}
      <section aria-labelledby="partenariat" className="relative overflow-hidden bg-primary-container text-white py-20 md:py-28">
        <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute right-0 bottom-0 w-[55%] md:w-[38%] h-40 md:h-56 pointer-events-none">
          <polygon points="110,300 400,190 400,236 232,300" fill="#3fae5a" />
          <polygon points="232,300 400,236 400,282 354,300" fill="#004aad" />
        </svg>
        <Container className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <h2 id="partenariat" className="font-display font-extrabold uppercase leading-[1.05] text-3xl md:text-[42px] text-white">
              Une continuité sur mesure
            </h2>
            <p className="text-lg text-on-primary-container leading-relaxed">
              Un cabinet de conseil en management et une Junior-Entreprise d'ingénieurs travaillent sur le même dossier.
              Les consultants de l'Université Jean Moulin Lyon 3 analysent votre organisation, les ingénieurs de l'ECE
              construisent les outils. Vous n'expliquez votre contexte qu'une seule fois.
            </p>
            <NavLink
              to="structures"
              onNavigate={onNavigate}
              className="self-start text-white font-medium underline decoration-jeece decoration-2 underline-offset-[6px] hover:decoration-sky"
            >
              Découvrir les deux structures
            </NavLink>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
            {branches.map((b) => (
              <div key={b.title} className="flex flex-col gap-6">
                <div className="flex items-center h-10">{b.logo}</div>
                <h3 className="font-display text-2xl font-bold" style={{ color: b.text }}>{b.title}</h3>
                <ol className="relative flex flex-col gap-6 pl-7">
                  <span aria-hidden="true" className="absolute left-[5px] top-1 bottom-1 border-l-2 border-dashed border-white/35" />
                  {b.items.map((it) => (
                    <li key={it} className="relative font-display text-lg font-bold text-white">
                      <span aria-hidden="true" className="absolute -left-7 top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: b.dot }} />
                      {it}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Les 3 engagements */}
      <section aria-labelledby="piliers" className="py-20 md:py-28">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 id="piliers" className="section-title text-3xl md:text-[42px]">Ce que vous y gagnez</h2>
            <p className="text-lg text-on-surface-variant md:max-w-[38ch] md:text-right">
              Trois engagements que nous tenons sur chaque mission conjointe.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((p) => (
              <li
                key={p.id}
                className={`engagement group relative flex flex-col gap-5 bg-white border border-border-gray rounded-2xl
                  pt-9 px-6 pb-7 md:px-8 md:pb-8 overflow-hidden transition-colors duration-300 ${p.tint}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1.5 transition-[height] duration-300 group-hover:h-2.5"
                  style={{ backgroundColor: p.color }}
                />
                <EngagementGlyph id={p.id} color={p.color} />
                <p className="text-sm font-medium uppercase tracking-wide" style={{ color: p.color === '#3fae5a' ? '#1d7a3b' : p.color }}>
                  {p.label}
                </p>
                <h3 className="font-display text-2xl md:text-[26px] font-bold text-primary leading-tight">{p.headline}</h3>
                <p className="text-[16px] leading-relaxed text-on-surface-variant">{p.text}</p>
                <p className="mt-auto pt-5 border-t border-border-gray flex gap-3 text-[15px] font-medium text-primary">
                  <span aria-hidden="true" className="mt-[7px] w-2 h-2 shrink-0" style={{ backgroundColor: p.color }} />
                  {p.proof}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Le déroulé d'une étude */}
      <StudyFlowSection onNavigate={onNavigate} />

      {/* Livrables et cas client */}
      <DeliverablesCase onNavigate={onNavigate} />

      {/* FAQ */}
      <section aria-labelledby="faq" className="bg-light-slate py-20 md:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="faq" className="section-title text-3xl md:text-[42px] lg:sticky lg:top-28">Questions fréquentes</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </Container>
      </section>

      {/* Contact : encadré "Nous contacter" de la plaquette */}
      <section aria-labelledby="contact-home" className="pb-20 md:pb-28">
        <Container>
          <div className="border-t border-border-gray pt-12 md:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <h2 id="contact-home" className="section-title text-3xl md:text-[42px]">Un processus vous fait perdre du temps ?</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed max-w-[52ch]">
                Décrivez-le en quelques lignes. Un chargé d'affaires ILJC et un chef de projet JEECE reviennent vers vous
                sous 24 h pour cadrer le diagnostic.
              </p>
              <NavLink
                to="contact"
                onNavigate={onNavigate}
                className="self-start inline-flex items-center gap-2 bg-secondary hover:bg-[#166531] text-white font-medium px-6 py-4 rounded-md transition-colors"
              >
                Démarrer un diagnostic <ArrowRight size={18} strokeWidth={1.75} />
              </NavLink>
            </div>
            <div className="lg:col-span-5">
              <ContactBox />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

/** Coordonnées des deux structures, en clair. */
export const ContactBox: React.FC = () => (
  <div className="bg-light-slate/70 border border-border-gray rounded-xl p-6 md:p-7 flex flex-col gap-6">
    <p className="text-sm font-medium uppercase tracking-wide text-on-surface-variant">Nous contacter</p>

    {[
      { c: CONTACTS.iljc, color: '#004aad' },
      { c: CONTACTS.jeece, color: '#3fae5a' },
    ].map(({ c, color }) => (
      <div key={c.name} className="flex gap-4">
        <span aria-hidden="true" className="mt-[7px] w-2.5 h-2.5 shrink-0" style={{ backgroundColor: color }} />
        <div className="flex flex-col gap-0.5">
          <p className="font-display text-lg font-bold text-primary leading-tight">{c.name}</p>
          <a href={`mailto:${c.email}`} className="text-[16px] text-on-surface-variant hover:text-primary break-all">
            {c.email}
          </a>
          <a href={c.phoneHref} className="text-[16px] text-on-surface-variant hover:text-primary">
            {c.phone}
          </a>
        </div>
      </div>
    ))}
  </div>
);
