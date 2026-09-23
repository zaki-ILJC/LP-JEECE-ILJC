import React from 'react';

/**
 * Trois micro-schémas construits avec le vocabulaire de la plaquette
 * (pastilles, trait pointillé, chevrons) plutôt que des icônes génériques.
 * Ils s'animent au survol de la carte.
 */
export const EngagementGlyph: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  const common = { 'aria-hidden': true as const, height: 34, className: 'block' };

  if (id === 'p1') {
    // Passation : une pastille bleue, un trait pointillé, une pastille verte
    return (
      <svg {...common} width={116} viewBox="0 0 116 34" fill="none">
        <circle cx="9" cy="17" r="8" fill="#004aad" />
        <line x1="22" y1="17" x2="94" y2="17" stroke="#34465f" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="107" cy="17" r="8" fill="#3fae5a" />
      </svg>
    );
  }

  if (id === 'p2') {
    // Temps gagné : des barres qui décroissent
    return (
      <svg {...common} width={116} viewBox="0 0 116 34" fill="none">
        <rect className="glyph-bar glyph-bar-1" x="0" y="4" width="18" height="30" fill="#34465f" />
        <rect className="glyph-bar glyph-bar-2" x="26" y="12" width="18" height="22" fill="#34465f" opacity="0.75" />
        <rect className="glyph-bar glyph-bar-3" x="52" y="22" width="18" height="12" fill="#34465f" opacity="0.5" />
        <rect className="glyph-bar glyph-bar-4" x="78" y="29" width="18" height="5" fill={color} opacity="0.9" />
      </svg>
    );
  }

  // Clé en main : la suite des chevrons du déroulé, le dernier plein
  return (
    <svg {...common} width={116} viewBox="0 0 116 34" fill="none">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className={`glyph-chevron glyph-chevron-${i + 1}`}
          d={`M${i * 26} 4 L${i * 26 + 14} 4 L${i * 26 + 24} 17 L${i * 26 + 14} 30 L${i * 26} 30 L${i * 26 + 10} 17 Z`}
          fill={color}
          opacity={0.25 + i * 0.2}
        />
      ))}
      <path className="glyph-chevron glyph-chevron-4" d="M78 4 L92 4 L102 17 L92 30 L78 30 L88 17 Z" fill={color} />
    </svg>
  );
};
