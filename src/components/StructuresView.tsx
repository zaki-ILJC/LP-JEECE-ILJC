import React from 'react';
import { NavScreen, Structure } from '../types';
import { STRUCTURES, JE_MOVEMENT } from '../data/content';
import { NavLink, IljcLogo, JeeceLogo, CornerShards } from './Brand';
import { Container, ContactBox } from './HomeView';
import { ArrowRight } from 'lucide-react';

interface StructuresViewProps {
  onNavigate: (screen: NavScreen) => void;
}

const JEECE_HISTORY = [
  { year: '1986', text: "Fondation de Hi-Tech par Bruno Delanef à l'ECE Paris, parmi les premières Junior-Entreprises du réseau ingénieur." },
  { year: '2007', text: 'Hi-Tech devient JEECE.' },
  { year: '2021', text: 'Implantation de JEECE à Lyon.' },
  { year: '2025', text: 'Partenariat avec IAE Lyon Junior Conseil.' },
  { year: '2026', text: "Chiffre d'affaires record de 100 000 €." },
];

const THEME = {
  iljc: { accent: '#004aad', soft: 'bg-pastel-blue', band: 'bg-royal-blue', text: 'text-royal-blue' },
  jeece: { accent: '#1d7a3b', soft: 'bg-pastel-green', band: 'bg-jeece', text: 'text-secondary' },
};

const StructureSection: React.FC<{ s: Structure; children?: React.ReactNode }> = ({ s, children }) => {
  const t = THEME[s.id];
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 py-20 md:py-24 border-t border-border-gray">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Colonne d'identité */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="min-h-12 flex items-center">{s.id === 'iljc' ? <IljcLogo className="h-12 w-auto" /> : <JeeceLogo variant="full" className="h-20 w-auto" />}</div>
            <div className={`h-1 w-16 ${t.band}`} />
            <dl className="flex flex-col gap-4 text-[15px]">
              <div><dt className="text-on-surface-variant text-sm">Création</dt><dd className="font-medium text-primary">{s.founded}</dd></div>
              <div><dt className="text-on-surface-variant text-sm">Rattachement</dt><dd className="font-medium text-primary">{s.school}</dd></div>
              <div><dt className="text-on-surface-variant text-sm">Statut</dt><dd className="font-medium text-primary">{s.legalLine}</dd></div>
              <div>
                <dt className="text-on-surface-variant text-sm">{s.offices.length > 1 ? 'Implantations' : 'Implantation'}</dt>
                {s.offices.map((o) => (
                  <dd key={o.city} className="font-medium text-primary">{o.address}</dd>
                ))}
              </div>
              <div>
                <dt className="text-on-surface-variant text-sm">Contact</dt>
                <dd><a href={`mailto:${s.email}`} className="font-medium text-primary hover:underline break-all">{s.email}</a></dd>
                <dd><a href={s.phoneHref} className="font-medium text-primary hover:underline">{s.phone}</a></dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* Contenu */}
        <div className="lg:col-span-8 flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <h2 id={`${s.id}-title`} className="section-title text-3xl md:text-[44px]">{s.name}</h2>
            {s.intro.map((p, i) => (
              <p key={i} className={`leading-relaxed text-on-surface-variant ${i === 0 ? 'text-lg md:text-xl text-primary' : 'text-[17px]'}`}>
                {p}
              </p>
            ))}
          </div>

          {/* Chiffres */}
          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-border-gray">
            {s.facts.map((f) => (
              <div key={f.label} className="border-r border-b border-border-gray p-5">
                <p className="font-display text-3xl md:text-4xl font-extrabold leading-none" style={{ color: t.accent }}>{f.value}</p>
                <p className="text-sm text-on-surface-variant mt-2 leading-snug">{f.label}</p>
              </div>
            ))}
          </div>

          {/* Expertises */}
          <div className="flex flex-col gap-7">
            <h3 className="font-display text-2xl font-bold text-primary">Domaines d'intervention</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              {s.expertises.map((e) => (
                <div key={e.title} className="pl-5 border-l-4" style={{ borderColor: t.accent }}>
                  <h4 className="font-display text-lg font-bold text-primary">{e.title}</h4>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed mt-1">{e.text}</p>
                </div>
              ))}
            </div>
          </div>

          {children}

          {/* Qualité + partenaires */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${t.soft} rounded-xl p-6 md:p-7`}>
              <h3 className="font-display text-lg font-bold text-primary mb-4">Engagements qualité</h3>
              <ul className="flex flex-col gap-2.5 text-[15px] text-primary">
                {s.quality.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 bg-primary shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border-gray rounded-xl p-6 md:p-7">
              <h3 className="font-display text-lg font-bold text-primary mb-4">{s.partnersLabel}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {s.partners.map((p) => (
                  <li key={p} className="font-condensed text-2xl text-primary-container">{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const StructuresView: React.FC<StructuresViewProps> = ({ onNavigate }) => {
  const [iljc, jeece] = STRUCTURES;

  return (
    <>
      {/* En-tête */}
      <section className="relative overflow-hidden">
        <CornerShards className="absolute -top-2 right-0 w-40 md:w-64 pointer-events-none" />
        <Container className="pt-14 pb-14 md:pt-20 md:pb-20 flex flex-col gap-6 max-w-[1200px]">
          <p className="text-[15px] font-medium text-royal-blue">Les structures</p>
          <h1 className="section-title text-[38px] sm:text-5xl lg:text-[58px] max-w-4xl">
            Deux Junior-Entreprises reconnues, un seul dossier
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-on-surface-variant max-w-[62ch]">
            IAE Lyon Junior Conseil, Junior-Entreprise de l'iaelyon School of Management (Université Jean Moulin Lyon 3),
            et JEECE, Junior-Entreprise de l'école d'ingénieurs ECE, unissent le conseil en gestion et l'expertise
            ingénieur. Voici qui intervient sur votre projet.
          </p>
          <nav aria-label="Sur cette page" className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-[15px]">
            <a href="#iljc" className="text-primary font-medium underline decoration-royal-blue decoration-2 underline-offset-[6px]">IAE Lyon Junior Conseil</a>
            <a href="#jeece" className="text-primary font-medium underline decoration-jeece decoration-2 underline-offset-[6px]">JEECE</a>
            <a href="#mouvement" className="text-primary font-medium underline decoration-primary-container decoration-2 underline-offset-[6px]">Le mouvement des Junior-Entreprises</a>
          </nav>
        </Container>
      </section>

      <StructureSection s={iljc} />

      <StructureSection s={jeece}>
        <div className="flex flex-col gap-7">
          <h3 className="font-display text-2xl font-bold text-primary">40 ans d'histoire</h3>
          <ol className="relative flex flex-col gap-6 pl-8">
            <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 border-l-2 border-dashed border-primary-container/60" />
            {JEECE_HISTORY.map((h) => (
              <li key={h.year} className="relative">
                <span aria-hidden="true" className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-jeece" />
                <span className="font-display text-xl font-extrabold text-primary">{h.year}</span>
                <p className="text-[15px] text-on-surface-variant mt-0.5">{h.text}</p>
              </li>
            ))}
          </ol>
          <div className="bg-light-slate rounded-xl p-6 md:p-7">
            <h4 className="font-display text-lg font-bold text-primary">L'ECE, école d'ingénieurs</h4>
            <p className="text-[15px] text-on-surface-variant leading-relaxed mt-2">
              Fondée en 1919, l'ECE forme des ingénieurs généralistes en électronique, informatique et systèmes. Elle
              compte 4 400 étudiants et 12 spécialisations dans son programme ingénieur, et se classe 5e école
              d'ingénieurs post-bac selon Le Figaro.
            </p>
          </div>
        </div>
      </StructureSection>

      {/* Mouvement JE */}
      <section id="mouvement" aria-labelledby="mouvement-title" className="scroll-mt-28 bg-primary-container text-white py-20 md:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2 id="mouvement-title" className="lg:col-span-5 font-display font-extrabold uppercase text-3xl md:text-[42px] leading-[1.05]">
            {JE_MOVEMENT.title}
          </h2>
          <div className="lg:col-span-7 flex flex-col gap-5">
            {JE_MOVEMENT.text.map((p, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-on-primary-container">{p}</p>
            ))}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                ['+200', 'Junior-Entreprises'],
                ['+85', 'villes en France'],
                ['25 000', 'étudiants impliqués'],
              ].map(([v, l]) => (
                <div key={l} className="border-t-4 border-jeece pt-3">
                  <p className="font-display text-3xl md:text-4xl font-extrabold">{v}</p>
                  <p className="text-sm text-on-primary-container mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pourquoi ensemble + contact */}
      <section aria-labelledby="ensemble" className="py-20 md:py-28">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 id="ensemble" className="section-title text-3xl md:text-[42px]">Ce que change le partenariat</h2>
            <dl className="flex flex-col gap-6">
              {[
                ['Un seul interlocuteur par phase', "Un chargé d'affaires ILJC pour le diagnostic, un chef de projet JEECE pour la réalisation, et une passation structurée entre les deux."],
                ['Aucune reprise de contexte', "Le diagnostic, la cartographie et le scoring des irritants sont transmis tels quels aux ingénieurs : ils construisent à partir de ce qui a été mesuré."],
                ['Le coût d’une Junior-Entreprise', "Des tarifs plus accessibles que ceux d'un cabinet et d'une ESN réunis, avec l'encadrement qualité de la CNJE."],
              ].map(([t, d]) => (
                <div key={t} className="pl-5 border-l-4 border-primary-container">
                  <dt className="font-display text-xl font-bold text-primary">{t}</dt>
                  <dd className="text-[16px] text-on-surface-variant leading-relaxed mt-1">{d}</dd>
                </div>
              ))}
            </dl>
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
        </Container>
      </section>
    </>
  );
};
