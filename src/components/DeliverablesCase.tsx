import React from 'react';
import { NavScreen } from '../types';
import { DELIVERABLES, FEATURED_CASE } from '../data/content';
import { NavLink } from './Brand';
import { ArrowRight } from 'lucide-react';

interface DeliverablesCaseProps {
  onNavigate: (screen: NavScreen) => void;
}

const NUM_COLOR = ['#004aad', '#34465f', '#1d7a3b'];
const OWNER_DOT: Record<string, string> = { iljc: '#46b1e5', jeece: '#3fae5a', neutre: '#8ea2b8' };

export const DeliverablesCase: React.FC<DeliverablesCaseProps> = ({ onNavigate }) => (
  <section aria-labelledby="livrables" className="py-20 md:py-28">
    <div className="max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Livrables */}
      <div className="lg:col-span-6 bg-white border border-border-gray rounded-2xl p-7 md:p-9 flex flex-col gap-7">
        <h2 id="livrables" className="section-title text-2xl md:text-[32px]">Ce que vous repartez avec</h2>

        <dl className="flex flex-col">
          {DELIVERABLES.map((d, i) => (
            <div key={d.title} className={`flex gap-5 py-5 ${i > 0 ? 'border-t border-border-gray' : 'pt-0'}`}>
              <span className="font-condensed text-[34px] leading-none pt-1 shrink-0" style={{ color: NUM_COLOR[i] }}>
                0{i + 1}
              </span>
              <div>
                <dt className="font-display text-lg font-bold text-primary">{d.title}</dt>
                <dd className="text-[16px] text-on-surface-variant mt-1 leading-relaxed">{d.text}</dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-auto text-[15px] text-on-surface-variant">
          Tout est remis documenté : vos équipes pilotent les nouveaux processus sans dépendre de nous.
        </p>
      </div>

      {/* Cas client */}
      <article className="lg:col-span-6 relative overflow-hidden bg-primary-container text-white rounded-2xl p-7 md:p-9 flex flex-col gap-7">
        <svg aria-hidden="true" viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute right-0 bottom-0 w-2/3 h-28 pointer-events-none">
          <polygon points="90,200 300,120 300,152 186,200" fill="#3fae5a" opacity="0.6" />
          <polygon points="186,200 300,152 300,184 262,200" fill="#004aad" opacity="0.7" />
        </svg>

        <div className="relative flex flex-col gap-1">
          <p className="text-sm font-medium uppercase tracking-wide text-sky">{FEATURED_CASE.label}</p>
          <h2 className="font-display text-2xl md:text-[32px] font-extrabold uppercase leading-[1.05]">{FEATURED_CASE.title}</h2>
        </div>

        <div className="relative flex items-end gap-4 border-y border-white/15 py-6">
          <p className="font-display text-[64px] md:text-[80px] font-extrabold leading-[0.85] text-white">{FEATURED_CASE.metric}</p>
          <p className="text-[17px] text-on-primary-container pb-2">{FEATURED_CASE.metricLabel}</p>
        </div>

        <ol className="relative flex flex-col gap-4 pl-7">
          <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 border-l-2 border-dashed border-white/30" />
          {FEATURED_CASE.rows.map((r) => (
            <li key={r.label} className="relative text-[15px] leading-relaxed">
              <span
                aria-hidden="true"
                className="absolute -left-7 top-[7px] w-3 h-3 rounded-full"
                style={{ backgroundColor: OWNER_DOT[r.owner] }}
              />
              <span className="font-medium text-white">{r.label} : </span>
              <span className="text-on-primary-container">{r.text}</span>
            </li>
          ))}
        </ol>

        <p className="relative text-[15px] text-on-primary-container leading-relaxed">{FEATURED_CASE.result}</p>

        <NavLink
          to="contact"
          onNavigate={onNavigate}
          className="relative self-start inline-flex items-center gap-2 bg-jeece hover:bg-[#379c50] text-primary font-medium px-6 py-3.5 rounded-md transition-colors"
        >
          Obtenir le même diagnostic <ArrowRight size={17} strokeWidth={1.75} />
        </NavLink>
      </article>
    </div>
  </section>
);
