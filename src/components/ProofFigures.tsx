import React, { useEffect, useRef, useState } from 'react';
import { PROOF_FIGURES } from '../data/content';

/** Sépare "L30", "+800", "40 ans" en préfixe, nombre et suffixe. */
const parse = (value: string) => {
  const m = value.match(/^(\D*)(\d[\d\s]*)(.*)$/);
  if (!m) return { prefix: value, target: 0, suffix: '' };
  return { prefix: m[1], target: parseInt(m[2].replace(/\s/g, ''), 10), suffix: m[3] };
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const Figure: React.FC<{ value: string; label: string; index: number; run: boolean }> = ({ value, label, index, run }) => {
  const { prefix, target, suffix } = parse(value);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!run) {
      setShown(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target);
      return;
    }
    const duration = 1100;
    const delay = index * 130;
    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, Math.max(0, (now - start - delay) / duration));
      setShown(Math.round(easeOut(t) * target));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, target, index]);

  return (
    <div
      className={`py-8 pr-5 transition-all duration-700 ease-out ${run ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
        ${index % 2 === 1 ? 'pl-5 border-l border-border-gray' : ''}
        ${index >= 2 ? 'border-t lg:border-t-0 border-border-gray' : ''}
        ${index === 2 ? 'lg:pl-5 lg:border-l' : ''}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <p className="font-display text-4xl md:text-5xl font-extrabold text-primary leading-none tabular-nums">
        {prefix}
        {shown.toLocaleString('fr-FR')}
        {suffix}
      </p>
      <p className="text-sm text-on-surface-variant mt-3 leading-snug max-w-[30ch]">{label}</p>
    </div>
  );
};

export const ProofFigures: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRun(true);
      return;
    }
    // Le compteur se relance à chaque fois que le bandeau revient dans l'écran.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setRun(e.isIntersecting)),
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Chiffres clés" className="border-y border-border-gray">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4">
        {PROOF_FIGURES.map((f, i) => (
          <Figure key={f.value} value={f.value} label={f.label} index={i} run={run} />
        ))}
      </div>
    </section>
  );
};
