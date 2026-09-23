import React, { useEffect, useState } from 'react';
import { NavScreen } from '../types';
import { CONTACTS } from '../data/content';
import { NavLink } from './Brand';
import { Phone } from 'lucide-react';

interface StickyCtaProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

/** Rappel d'action sur mobile : le formulaire reste à un geste. */
export const StickyCta: React.FC<StickyCtaProps> = ({ currentScreen, onNavigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (currentScreen === 'contact') return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border-gray px-4 pt-3 flex gap-3
        transition-transform duration-300 motion-reduce:transition-none ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href={CONTACTS.iljc.phoneHref}
        aria-label={`Appeler IAE Lyon Junior Conseil au ${CONTACTS.iljc.phone}`}
        className="shrink-0 w-12 h-12 rounded-md border border-border-gray text-primary flex items-center justify-center"
      >
        <Phone size={18} />
      </a>
      <NavLink
        to="contact"
        onNavigate={onNavigate}
        className="flex-grow bg-secondary text-white rounded-md font-medium flex items-center justify-center"
      >
        Demander un diagnostic
      </NavLink>
    </div>
  );
};
