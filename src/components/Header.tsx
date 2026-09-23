import React, { useEffect, useState } from 'react';
import { NavScreen } from '../types';
import { NavLink, Lockup } from './Brand';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

const NAV_ITEMS: { label: string; screen: NavScreen }[] = [
  { label: 'Accueil', screen: 'accueil' },
  { label: 'Méthodologie', screen: 'methodologie' },
  { label: 'Structures', screen: 'structures' },
  { label: 'Contact', screen: 'contact' },
];

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (screen: NavScreen) => {
    setOpen(false);
    onNavigate(screen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_1px_0_#d4dbe3]' : ''}`}
    >
      <div className="max-w-[1200px] mx-auto h-16 px-5 md:px-8 flex items-center justify-between gap-6">
        <NavLink to="accueil" onNavigate={go} aria-label="Accueil ILJC x JEECE" className="shrink-0">
          <Lockup />
        </NavLink>

        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = currentScreen === item.screen;
            return (
              <NavLink
                key={item.screen}
                to={item.screen}
                onNavigate={go}
                aria-current={active ? 'page' : undefined}
                className={`relative py-5 text-[15px] font-normal transition-colors ${
                  active ? 'text-primary font-medium' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
                {active && <span className="absolute left-0 right-0 bottom-3 h-[3px] bg-jeece" />}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="contact"
            onNavigate={go}
            className="hidden sm:inline-flex bg-secondary hover:bg-[#166531] text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors"
          >
            Demander un diagnostic
          </NavLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden p-2 text-primary"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="brand-rule" />

      {open && (
        <nav aria-label="Navigation mobile" className="md:hidden bg-white border-b border-border-gray px-5 pb-5 pt-2 flex flex-col">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.screen}
              to={item.screen}
              onNavigate={go}
              className={`py-3.5 text-lg border-b border-light-slate ${
                currentScreen === item.screen ? 'text-primary font-medium' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="contact"
            onNavigate={go}
            className="mt-4 bg-secondary text-white text-center font-medium py-3.5 rounded-md"
          >
            Demander un diagnostic
          </NavLink>
        </nav>
      )}
    </header>
  );
};
