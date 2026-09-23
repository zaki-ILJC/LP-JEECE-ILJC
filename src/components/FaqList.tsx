import React, { useEffect } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { faqJsonLd } from '../seo';

/**
 * FAQ en accordéons natifs <details> : le texte des réponses reste dans le DOM,
 * donc lisible par les moteurs de recherche et les moteurs génératifs.
 * Injecte aussi le balisage FAQPage (schema.org) tant que la liste est affichée.
 */
export const FaqList: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.jsonld = 'faq';
    script.text = JSON.stringify(faqJsonLd());
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="divide-y divide-border-gray border-y border-border-gray">
      {FAQ_ITEMS.map((f, i) => (
        <details key={f.question} className="py-5" open={i === 0}>
          <summary className="flex items-start justify-between gap-6">
            <h3 className="font-display text-lg md:text-xl font-bold text-primary">{f.question}</h3>
            <span aria-hidden="true" className="faq-sign text-2xl leading-none text-royal-blue transition-transform">+</span>
          </summary>
          <p className="mt-3 text-[16px] leading-relaxed text-on-surface-variant max-w-[70ch]">{f.answer}</p>
        </details>
      ))}
    </div>
  );
};
