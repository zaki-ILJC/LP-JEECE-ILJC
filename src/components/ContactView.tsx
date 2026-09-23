import React, { useState } from 'react';
import { NavScreen } from '../types';
import { Container, ContactBox } from './HomeView';
import { FaqList } from './FaqList';
import { NavLink, CornerShards } from './Brand';
import { ArrowRight } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (screen: NavScreen) => void;
}

const NEEDS = [
  { value: 'diagnostic-automatisation', label: 'Diagnostic et automatisation clé en main' },
  { value: 'audit-si', label: 'Audit SI et analyse des processus' },
  { value: 'automatisation', label: 'Automatisation de tâches identifiées' },
  { value: 'ia', label: 'Intelligence artificielle' },
  { value: 'iseor', label: 'Diagnostic socio-économique ISEOR' },
  { value: 'autre', label: 'Autre demande' },
];

const BUDGETS = [
  { value: '', label: 'Je ne sais pas encore' },
  { value: '-3k', label: 'Moins de 3 000 €' },
  { value: '3-8k', label: '3 000 € à 8 000 €' },
  { value: '8-15k', label: '8 000 € à 15 000 €' },
  { value: '15k+', label: 'Plus de 15 000 €' },
];

const EMPTY = { name: '', company: '', email: '', phone: '', need: 'diagnostic-automatisation', budget: '', message: '', website: '' };

const inputCls =
  'w-full bg-white border border-border-gray rounded-md px-4 py-3 text-[16px] text-primary placeholder:text-outline ' +
  'focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/15 transition-colors';

const Field: React.FC<{ label: string; htmlFor: string; optional?: boolean; children: React.ReactNode }> = ({
  label,
  htmlFor,
  optional,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="text-sm font-medium text-primary">
      {label}
      {optional ? <span className="font-light text-on-surface-variant"> (facultatif)</span> : <span className="text-royal-blue"> *</span>}
    </label>
    {children}
  </div>
);

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Routage des leads (n8n / webhook vers CRM, boîtes mail et Slack). Voir .env.example.
  const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (form.website) return; // champ piège anti-robots
    setError(null);
    setSubmitting(true);
    try {
      if (LEAD_WEBHOOK_URL) {
        const { website, ...payload } = form;
        const res = await fetch(LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, source: 'landing-iljc-x-jeece', page: window.location.pathname, sentAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error('webhook');
      }
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      gtag?.('event', 'generate_lead', { event_category: 'formulaire', event_label: form.need });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError("L'envoi n'a pas abouti. Réessayez dans un instant ou écrivez-nous à contact@iaelyonjuniorconseil.fr.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <CornerShards className="absolute -top-2 right-0 w-40 md:w-64 pointer-events-none" />
        <Container className="pt-14 pb-20 md:pt-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-medium text-royal-blue">Contact</p>
              <h1 className="section-title text-[38px] sm:text-5xl lg:text-[56px]">Demander un diagnostic</h1>
              <p className="text-lg leading-relaxed text-on-surface-variant max-w-[55ch]">
                Décrivez votre organisation et les tâches qui vous prennent du temps. Un chargé d'affaires vous répond
                sous 24 h. Premier échange sans engagement.
              </p>
            </div>

            {submitted ? (
              <div role="status" className="border-2 border-jeece rounded-2xl p-8 flex flex-col gap-4">
                <p className="font-display text-2xl font-bold text-primary">Demande envoyée, merci {form.name.split(' ')[0]}.</p>
                <p className="text-[16px] text-on-surface-variant leading-relaxed">
                  Un chargé d'affaires IAE Lyon Junior Conseil et un chef de projet JEECE reviennent vers vous sous 24 h
                  à l'adresse {form.email} pour convenir d'un premier échange.
                </p>
                <div className="flex flex-wrap gap-5 pt-2">
                  <NavLink to="methodologie" onNavigate={onNavigate} className="text-primary font-medium underline decoration-jeece decoration-2 underline-offset-[6px]">
                    Lire le déroulé d'une étude
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                    className="text-on-surface-variant underline underline-offset-[6px]"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Nom et prénom" htmlFor="f-name">
                    <input id="f-name" required autoComplete="name" value={form.name} onChange={set('name')} className={inputCls} />
                  </Field>
                  <Field label="Entreprise" htmlFor="f-company">
                    <input id="f-company" required autoComplete="organization" value={form.company} onChange={set('company')} className={inputCls} />
                  </Field>
                  <Field label="E-mail professionnel" htmlFor="f-email">
                    <input id="f-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} className={inputCls} />
                  </Field>
                  <Field label="Téléphone" htmlFor="f-phone" optional>
                    <input id="f-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
                  </Field>
                </div>

                <Field label="Type de besoin" htmlFor="f-need">
                  <select id="f-need" value={form.need} onChange={set('need')} className={inputCls}>
                    {NEEDS.map((n) => <option key={n.value} value={n.value}>{n.label}</option>)}
                  </select>
                </Field>

                <Field label="Budget envisagé" htmlFor="f-budget" optional>
                  <select id="f-budget" value={form.budget} onChange={set('budget')} className={inputCls}>
                    {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </Field>

                <Field label="Votre contexte" htmlFor="f-message" optional>
                  <textarea
                    id="f-message"
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Logiciels utilisés, tâches répétitives, nombre de personnes concernées…"
                    className={`${inputCls} resize-y`}
                  />
                </Field>

                {/* Champ piège : invisible pour les humains */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="f-website">Site web</label>
                  <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
                </div>

                {error && (
                  <p role="alert" className="text-[15px] text-red-800 bg-red-50 border border-red-200 rounded-md px-4 py-3">{error}</p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-[#166531] disabled:opacity-70 text-white font-medium px-7 py-4 rounded-md transition-colors"
                  >
                    {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                    {!submitting && <ArrowRight size={18} strokeWidth={1.75} />}
                  </button>
                  <p className="text-sm text-on-surface-variant max-w-[40ch]">
                    Vos informations restent entre IAE Lyon Junior Conseil et JEECE. Aucune revente de données.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Colonne de réassurance */}
          <aside className="lg:col-span-5 flex flex-col gap-8 lg:pt-[168px]">
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl font-bold text-primary">Après votre demande</h2>
              <ol className="relative flex flex-col gap-5 pl-8">
                <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 border-l-2 border-dashed border-primary-container/60" />
                {[
                  ['Sous 24 h', "Un chargé d'affaires vous répond et fixe un premier échange."],
                  ['Premier échange', 'Nous cadrons votre besoin, vos outils et les processus concernés.'],
                  ['Proposition', "Vous recevez une proposition d'intervention conjointe ILJC x JEECE."],
                ].map(([t, d], i) => (
                  <li key={t} className="relative">
                    <span aria-hidden="true" className={`absolute -left-8 top-1.5 w-3 h-3 rounded-full ${i === 2 ? 'bg-jeece' : 'bg-royal-blue'}`} />
                    <p className="font-display text-lg font-bold text-primary">{t}</p>
                    <p className="text-[15px] text-on-surface-variant">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <ContactBox />
          </aside>
        </Container>
      </section>

      <section aria-labelledby="faq-contact" className="bg-light-slate py-20 md:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="faq-contact" className="section-title text-3xl md:text-[42px] lg:sticky lg:top-28">Questions fréquentes</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </Container>
      </section>
    </>
  );
};
