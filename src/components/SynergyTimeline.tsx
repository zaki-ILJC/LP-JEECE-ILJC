import React, { useState } from 'react';
import { NavScreen, SynergyNode, SynergyBranch } from '../types';
import { SYNERGY_NODES, SYNERGY_BRANCHES } from '../data/content';
import { NavLink, IljcLogo, JeeceLogo } from './Brand';
import { ArrowRight } from 'lucide-react';

interface SynergyTimelineProps {
  onNavigate: (screen: NavScreen) => void;
}

/** Couleurs de la charte (pastilles bleues côté ILJC, vertes côté JEECE, comme sur la plaquette). */
const OWNER_STYLE = {
  ILJC: { dot: '#004aad', text: '#004aad' },
  JEECE: { dot: '#3fae5a', text: '#1d7a3b' },
};

/**
 * Reprise de la ligne verticale de la plaquette : trait pointillé, pastilles,
 * libellés en gras de part et d'autre. Au survol, au focus clavier ou au tap,
 * le jalon s'ouvre et affiche son détail.
 */
export const SynergyTimeline: React.FC<SynergyTimelineProps> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeId = hovered ?? pinned;

  const renderNode = (node: SynergyNode) => {
    const isActive = activeId === node.id;
    const left = node.side === 'left';
    const c = OWNER_STYLE[node.owner];

    const label = (
      <button
        type="button"
        aria-expanded={isActive}
        onMouseEnter={() => setHovered(node.id)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(node.id)}
        onBlur={() => setHovered(null)}
        onClick={() => setPinned(pinned === node.id ? null : node.id)}
        className={`block w-full max-w-[440px] text-left cursor-pointer ${left ? 'md:ml-auto md:text-right' : ''}`}
      >
        <span
          className="block font-display text-xl md:text-2xl font-bold leading-tight transition-colors duration-200"
          style={{ color: isActive ? c.text : '#1f2d44' }}
        >
          {node.title}
        </span>
        <span className="block text-sm text-on-surface-variant mt-1">{node.tagline}</span>

        <span
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <span className="overflow-hidden">
            <span className="block mt-4 py-1 border-l-2 pl-4 text-left" style={{ borderColor: c.dot }}>
              <span className="block text-[15px] leading-relaxed text-on-surface-variant">{node.description}</span>
              <span className="flex flex-col gap-1.5 mt-3">
                {node.points.map((p) => (
                  <span key={p} className="flex gap-2.5 text-[14px] text-primary">
                    <span aria-hidden="true" className="mt-[8px] w-1.5 h-1.5 shrink-0" style={{ backgroundColor: c.dot }} />
                    <span>{p}</span>
                  </span>
                ))}
              </span>
              <span className="block mt-3 text-[13px] font-medium uppercase tracking-wide" style={{ color: c.text }}>
                {node.deliverable}
              </span>
            </span>
          </span>
        </span>
      </button>
    );

    return (
      <li key={node.id} className="relative grid grid-cols-[32px_1fr] md:grid-cols-[1fr_72px_1fr] items-start">
        <div className="hidden md:block">{left ? label : null}</div>

        <div className="relative flex justify-start md:justify-center pt-[9px]">
          <span
            aria-hidden="true"
            className={`absolute top-[15px] h-0.5 transition-all duration-300 left-[16px] ${left ? 'md:left-auto md:right-[calc(50%+8px)]' : 'md:left-[calc(50%+8px)]'}`}
            style={{ backgroundColor: c.dot, width: isActive ? 18 : 0 }}
          />
          <span
            aria-hidden="true"
            className="relative z-10 ml-[9px] md:ml-0 w-3.5 h-3.5 rounded-full transition-transform duration-200"
            style={{
              backgroundColor: c.dot,
              transform: isActive ? 'scale(1.35)' : 'scale(1)',
              outline: isActive ? `2px solid ${c.dot}` : 'none',
              outlineOffset: 3,
            }}
          />
        </div>

        <div className={left ? 'md:hidden' : ''}>{label}</div>
      </li>
    );
  };

  const renderBranch = (branch: SynergyBranch, owner: 'ILJC' | 'JEECE') => (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 pl-12 md:pl-0 md:justify-center pb-8">
        {owner === 'ILJC' ? <IljcLogo className="h-9 w-auto" /> : <JeeceLogo className="h-9 w-auto" />}
        <h3 className="font-display text-2xl md:text-[32px] font-bold leading-tight" style={{ color: OWNER_STYLE[owner].text }}>
          {branch.title}
        </h3>
      </div>
      <ol className="relative flex flex-col gap-9 py-6">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[15px] md:left-1/2 md:-translate-x-1/2 border-l-2 border-dashed border-primary-container"
        />
        {SYNERGY_NODES.filter((n) => n.owner === owner).map(renderNode)}
      </ol>
    </div>
  );

  return (
    <div className="flex flex-col gap-10" onMouseLeave={() => setHovered(null)}>
      <div className="flex flex-col gap-3 max-w-2xl">
        <h2 className="section-title text-3xl md:text-[42px]">Le parcours complet, jalon par jalon</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Survolez un jalon pour voir ce qui s'y passe concrètement et ce que vous récupérez à la fin.
          Sur mobile, touchez le jalon pour l'ouvrir.
        </p>
      </div>

      <div className="flex flex-col pt-6">
        {renderBranch(SYNERGY_BRANCHES[0], 'ILJC')}

        {/* Bandeau central de la plaquette */}
        <div className="relative flex flex-col items-start md:items-center gap-4 pl-12 md:pl-0 md:text-center py-6">
          <span aria-hidden="true" className="absolute top-0 h-6 left-[15px] md:left-1/2 border-l-2 border-dashed border-primary-container" />
          <p className="section-title text-2xl md:text-[34px] pt-8 max-w-md">Une continuité sur mesure</p>
          <p className="text-[16px] text-on-surface-variant leading-relaxed max-w-md">
            Consultants et ingénieurs se passent le dossier en atelier commun : aucune information ne se perd entre
            l'analyse et le développement.
          </p>
          <NavLink
            to="contact"
            onNavigate={onNavigate}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-[#166531] text-white font-medium px-6 py-3.5 rounded-md transition-colors"
          >
            Démarrer mon diagnostic <ArrowRight size={17} strokeWidth={1.75} />
          </NavLink>
          <span aria-hidden="true" className="h-10 border-l-2 border-dashed border-primary-container absolute bottom-[-40px] left-[15px] md:left-1/2" />
        </div>

        <div className="pt-12">{renderBranch(SYNERGY_BRANCHES[1], 'JEECE')}</div>
      </div>
    </div>
  );
};
