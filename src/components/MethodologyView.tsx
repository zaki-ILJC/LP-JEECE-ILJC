import React, { useState } from 'react';
import { NavScreen, ProcessStep } from '../types';
import { PROCESS_STEPS } from '../data/content';
import { SynergyTimeline } from './SynergyTimeline';
import { Container } from './HomeView';
import { NavLink, CornerShards } from './Brand';
import { ArrowRight } from 'lucide-react';

interface MethodologyViewProps {
  onNavigate: (screen: NavScreen) => void;
}

/** Couleurs de la charte par phase (le contenu des phases reste inchangé). */
const PHASE_COLOR: Record<ProcessStep['structure'], string> = {
  ILJC: '#004aad',
  Transition: '#34465f',
  JEECE: '#2e9448',
  Livraison: '#1f2d44',
};

const Bullet: React.FC<{ color?: string }> = ({ color = '#1f2d44' }) => (
  <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 shrink-0" style={{ backgroundColor: color }} />
);

export const MethodologyView: React.FC<MethodologyViewProps> = ({ onNavigate }) => {
  const [activeStepId, setActiveStepId] = useState<string>('step1');
  const selectedStep = PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];
  const selectedColor = PHASE_COLOR[selectedStep.structure];

  return (
    <>
      {/* En-tête */}
      <section className="relative overflow-hidden">
        <CornerShards className="absolute -top-2 right-0 w-40 md:w-64 pointer-events-none" />
        <Container className="pt-14 pb-12 md:pt-20 md:pb-16 flex flex-col gap-6">
          <p className="text-[15px] font-medium text-royal-blue">Cadre Méthodologique Éprouvé</p>
          <h1 className="section-title text-[38px] sm:text-5xl lg:text-[58px] max-w-4xl">
            De l'audit stratégique au code en production
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-on-surface-variant max-w-[62ch]">
            Le partenariat ILJC x JEECE comble le fossé classique entre la recommandation stratégique et l'exécution logicielle.
            Chaque étape s'enchaîne sans déperdition d'information grâce à notre binôme consultant-ingénieur.
          </p>
        </Container>
      </section>

      {/* Ligne verticale interactive (plaquette commerciale) */}
      <section className="pb-20 md:pb-24">
        <Container>
          <SynergyTimeline onNavigate={onNavigate} />
        </Container>
      </section>

      {/* Les 4 phases */}
      <section className="bg-light-slate py-20 md:py-24">
        <Container className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = step.id === activeStepId;
              const color = PHASE_COLOR[step.structure];
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  aria-pressed={isActive}
                  className={`text-left flex flex-col bg-white transition-colors cursor-pointer border-b-4 ${
                    isActive ? '' : 'border-transparent hover:bg-white/70'
                  }`}
                  style={isActive ? { borderBottomColor: color } : undefined}
                >
                  <div
                    className={`h-14 flex items-center justify-between px-5 pr-9 text-white ${idx === 3 ? 'chevron-end pl-9' : idx === 0 ? 'chevron-start' : 'chevron-path pl-9'}`}
                    style={{ backgroundColor: color, opacity: isActive ? 1 : 0.85 }}
                  >
                    <span className="font-condensed text-2xl">Phase 0{idx + 1}</span>
                    <span className="text-xs font-medium tracking-wide">{step.structure}</span>
                  </div>
                  <div className="p-5 flex flex-col gap-1 flex-grow">
                    <h3 className="font-display text-lg font-bold text-primary">{step.name}</h3>
                    <p className="text-sm text-on-surface-variant">{step.summary}</p>
                    <p className={`mt-4 text-sm font-medium inline-flex items-center gap-1.5 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {isActive ? 'Sélectionné' : 'Voir le détail'}
                      <ArrowRight size={14} strokeWidth={1.75} className={isActive ? 'translate-x-0.5' : ''} />
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <p className="text-sm font-medium tracking-wide uppercase" style={{ color: selectedColor }}>
                Focus Phase • {selectedStep.structure}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
                {selectedStep.name} : {selectedStep.summary}
              </h2>
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-sm font-medium text-primary">Actions clés menées durant cette phase :</p>
                {selectedStep.details.map((detail, i) => (
                  <p key={i} className="flex gap-3 text-[16px] text-on-surface-variant leading-relaxed">
                    <Bullet color={selectedColor} />
                    <span>{detail}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-primary-container p-4 rounded-2xl">
              <div className="bg-pastel-slate rounded-xl p-6 h-full flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <p className="font-display text-lg font-bold text-primary">Livrables Contractuels</p>
                  <ul className="flex flex-col gap-3">
                    {selectedStep.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex gap-3 text-[15px] text-primary">
                        <Bullet />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-primary/15 flex items-center justify-between text-sm text-primary">
                  <span>Validation conjointe</span>
                  <span className="font-medium">Conformité CNJE</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comparatif */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="section-title text-3xl md:text-[42px]">Pourquoi choisir l'alliance ILJC x JEECE ?</h2>
            <p className="text-lg text-on-surface-variant">La comparaison avec les schémas classiques du marché.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border-gray rounded-2xl p-7 md:p-9 flex flex-col gap-5">
              <p className="text-sm font-medium text-on-surface-variant uppercase tracking-wide">Approche traditionnelle en silos</p>
              <h3 className="font-display text-xl font-bold text-primary">Cabinet d'audit séparé d'une agence de développement</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-on-surface-variant">
                {[
                  "Rapports d'audit purement théoriques qui restent au fond d'un tiroir.",
                  'Développeurs isolés qui automatisent des processus mal compris ou défaillants.',
                  'Déperdition critique de contexte lors du passage de témoin.',
                  'Multiplication des intermédiaires, des devis et des coûts de gestion.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="text-outline font-medium">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-royal-blue rounded-2xl p-7 md:p-9 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-royal-blue uppercase tracking-wide">Partenariat Intégré ILJC x JEECE</p>
                <span className="text-xs font-medium text-white bg-secondary px-2.5 py-1">Notre Synergie</span>
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Une chaîne continue : De la stratégie au déploiement technique</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-primary">
                {[
                  'Les ingénieurs JEECE participent aux ateliers de cadrage dès le premier jour.',
                  'Optimisation préalable des processus par ILJC avant tout développement.',
                  'Interlocuteur et pilotage unifiés pour une réactivité maximale.',
                  'Tarification étudiée et compétitive grâce au statut Junior-Entreprise.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="text-secondary font-medium">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="border-t-4 border-primary-container pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">Prêt à cartographier vos processus métiers ?</h2>
              <p className="text-[16px] text-on-surface-variant">
                Décrivez votre situation en 2 minutes : un consultant et un ingénieur vous rappellent sous 24 h.
              </p>
            </div>
            <NavLink
              to="contact"
              onNavigate={onNavigate}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-[#166531] text-white font-medium px-6 py-4 rounded-md transition-colors"
            >
              Demander mon diagnostic <ArrowRight size={18} strokeWidth={1.75} />
            </NavLink>
          </div>
        </Container>
      </section>
    </>
  );
};
