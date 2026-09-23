import React, { useCallback, useEffect, useState } from 'react';
import { NavScreen } from './types';
import { PATHS, screenFromPath, applySeo } from './seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MethodologyView } from './components/MethodologyView';
import { StructuresView } from './components/StructuresView';
import { ContactView } from './components/ContactView';
import { StickyCta } from './components/StickyCta';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>(() => screenFromPath(window.location.pathname));

  // Une URL par page (indexable), y compris l'ancienne /diagnostic redirigée vers /contact.
  useEffect(() => {
    const expected = PATHS[currentScreen];
    if (window.location.pathname !== expected) {
      window.history.replaceState({}, '', expected + window.location.search + window.location.hash);
    }
    const onPop = () => setCurrentScreen(screenFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applySeo(currentScreen);
  }, [currentScreen]);

  const handleNavigate = useCallback((screen: NavScreen) => {
    if (screen !== currentScreen) {
      // Conserve les paramètres de campagne (utm, gclid) pour le suivi Google Ads.
      window.history.pushState({}, '', PATHS[screen] + window.location.search);
      setCurrentScreen(screen);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentScreen]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body pt-[68px] pb-20 md:pb-0">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-[60] bg-white px-4 py-2 text-primary">
        Aller au contenu
      </a>
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />

      <main id="contenu" className="flex-grow flex flex-col">
        {currentScreen === 'accueil' && <HomeView onNavigate={handleNavigate} />}
        {currentScreen === 'methodologie' && <MethodologyView onNavigate={handleNavigate} />}
        {currentScreen === 'structures' && <StructuresView onNavigate={handleNavigate} />}
        {currentScreen === 'contact' && <ContactView onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <StickyCta currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
