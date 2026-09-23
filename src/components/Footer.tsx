import React from 'react';
import { NavScreen } from '../types';
import { STRUCTURES } from '../data/content';
import { NavLink, Lockup } from './Brand';

interface FooterProps {
  onNavigate: (screen: NavScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto bg-primary-container text-white">
      <div className="brand-rule" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-14 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4 flex flex-col gap-5">
          <Lockup tone="light" />
          <p className="text-sm text-on-primary-container leading-relaxed max-w-sm">
            Diagnostic organisationnel et automatisation des processus : l'offre conjointe de deux
            Junior-Entreprises membres de la Confédération Nationale des Junior-Entreprises (CNJE).
          </p>
          <NavLink
            to="contact"
            onNavigate={onNavigate}
            className="self-start bg-jeece hover:bg-[#379c50] text-primary font-medium text-sm px-4 py-2.5 rounded-md transition-colors"
          >
            Demander un diagnostic
          </NavLink>
        </div>

        {STRUCTURES.map((s) => (
          <address key={s.id} className="md:col-span-3 not-italic flex flex-col gap-2 text-sm">
            <span className="font-display font-bold uppercase tracking-wide text-white">{s.name}</span>
            {s.offices.map((o) => (
              <span key={o.city} className="text-on-primary-container">{o.address}</span>
            ))}
            <a href={`mailto:${s.email}`} className="text-white hover:underline underline-offset-4">{s.email}</a>
            <a href={s.phoneHref} className="text-white hover:underline underline-offset-4">{s.phone}</a>
          </address>
        ))}

        <nav aria-label="Plan du site" className="md:col-span-2 flex flex-col gap-2 text-sm">
          <span className="font-display font-bold uppercase tracking-wide">Plan du site</span>
          <NavLink to="accueil" onNavigate={onNavigate} className="text-on-primary-container hover:text-white">Accueil</NavLink>
          <NavLink to="methodologie" onNavigate={onNavigate} className="text-on-primary-container hover:text-white">Méthodologie</NavLink>
          <NavLink to="structures" onNavigate={onNavigate} className="text-on-primary-container hover:text-white">Structures</NavLink>
          <NavLink to="contact" onNavigate={onNavigate} className="text-on-primary-container hover:text-white">Contact</NavLink>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-on-primary-container">
          <span>© {new Date().getFullYear()} IAE Lyon Junior Conseil et JEECE. Associations loi 1901 à but non lucratif.</span>
          <span>{STRUCTURES.map((s) => s.legalLine).join(' · ')}</span>
        </div>
      </div>
    </footer>
  );
};
