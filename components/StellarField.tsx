'use client';

const STAR_COUNT = 24;

export default function StellarField() {
  return (
    <div className="stellar-field" aria-hidden="true">
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        // Deterministic positions keep the exported HTML stable and avoid a
        // layout-changing random field on every hydration.
        const top = 4 + ((index * 47 + 13) % 92);
        const left = 3 + ((index * 71 + 19) % 94);
        const delay = -((index * 0.73) % 6).toFixed(2);
        return (
          <span
            key={index}
            className="stellar-star"
            style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
          />
        );
      })}
    </div>
  );
}
