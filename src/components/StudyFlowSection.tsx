import React from 'react';
import { NavScreen } from '../types';
import { STUDY_FLOW } from '../data/content';
import { NavLink } from './Brand';
import { ArrowRight } from 'lucide-react';

interface StudyFlowProps {
  onNavigate: (screen: NavScreen) => void;
}

const CHEVRON_BG: Record<string, string> = {
  'royal-blue': '#004aad',
  'primary-container': '#34465f',
  jeece: '#2e9448',
};

export const StudyFlowSection: React.FC<StudyFlowProps> = ({ onNavigate }) => {
  return (
    <section aria-labelledby="deroule" className="bg-light-slate py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <h2 id="deroule" className="section-title text-3xl md:text-[42px]">Le déroulé d'une étude</h2>
          <p className="text-lg text-on-surface-variant">De l'analyse à la solution technique, une continuité sans rupture.</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-y-0">
          {STUDY_FLOW.map((s, i) => {
            const shape = i === 0 ? 'chevron-start' : i === STUDY_FLOW.length - 1 ? 'chevron-end' : 'chevron-path';
            const color = CHEVRON_BG[s.color];
            return (
              <li key={s.id} className="flex flex-col gap-6">
                <div
                  className={`h-20 md:h-24 flex items-center justify-center text-white px-10 ${shape} ${i > 0 ? 'md:-ml-4' : ''}`}
                  style={{ backgroundColor: color }}
                >
                  <span className="font-condensed text-[26px] md:text-[28px] leading-[0.95] text-center uppercase">{s.name}</span>
                </div>

                <div className="flex flex-col gap-4 md:pr-6">
                  <ul className="flex flex-col gap-1.5 text-[15px] text-on-surface-variant">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 shrink-0" style={{ backgroundColor: color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="font-display text-lg font-bold text-primary leading-snug">{s.outcome}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Relais vers la méthode détaillée et vers le formulaire */}
        <div className="relative overflow-hidden bg-white border-2 border-primary-container rounded-2xl px-7 py-8 md:px-10 md:py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <svg aria-hidden="true" viewBox="0 0 120 60" className="absolute -right-2 top-0 h-full w-32 opacity-[0.07] pointer-events-none">
            <path d="M0 0 L40 0 L70 30 L40 60 L0 60 L30 30 Z" fill="#34465f" />
            <path d="M50 0 L90 0 L120 30 L90 60 L50 60 L80 30 Z" fill="#004aad" />
          </svg>
          <div className="relative flex flex-col gap-2 max-w-2xl">
            <p className="font-display text-xl md:text-[26px] font-bold text-primary leading-tight">
              Chaque étape, livrable par livrable
            </p>
            <p className="text-[16px] text-on-surface-variant leading-relaxed">
              Qui intervient, ce qui est produit, ce que vous récupérez à la fin de chaque phase : le détail complet
              des quatre étapes, jalon par jalon.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <NavLink
              to="methodologie"
              onNavigate={onNavigate}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-container text-primary font-medium px-6 py-3.5 rounded-md transition-colors hover:bg-primary-container hover:text-white"
            >
              Le détail de chaque étape <ArrowRight size={17} strokeWidth={1.75} />
            </NavLink>
            <NavLink
              to="contact"
              onNavigate={onNavigate}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-[#166531] text-white font-medium px-6 py-3.5 rounded-md transition-colors"
            >
              Démarrer un diagnostic
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
