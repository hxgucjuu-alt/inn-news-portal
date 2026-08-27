'use client';

import { useEffect, useState } from 'react';
import BilingualText from '@/components/BilingualText';

type FictionOpeningModalProps = {
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  startsAt?: string;
  hours?: number;
  hasSubstantiveBody: boolean;
};

function isWindowOpen(startsAt?: string, hours?: number) {
  const durationMs = Number(hours) * 60 * 60 * 1000;
  const startMs = startsAt ? Date.parse(startsAt) : Number.NaN;
  return Number.isFinite(startMs) && Number.isFinite(durationMs) && durationMs > 0 && Date.now() >= startMs && Date.now() < startMs + durationMs;
}

export default function FictionOpeningModal(props: FictionOpeningModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(props.hasSubstantiveBody && props.excerpt.trim() && isWindowOpen(props.startsAt, props.hours)));
  }, [props.hasSubstantiveBody, props.excerpt, props.startsAt, props.hours]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050b]/85 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="fiction-opening-title">
      <section className="w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-300/40 bg-[#111827] shadow-[0_0_80px_rgba(34,211,238,0.2)]">
        <div className="border-b border-cyan-400/20 bg-cyan-400/[0.06] px-6 py-4">
          <p className="font-mono text-[11px] tracking-[0.22em] text-cyan-300"><BilingualText zh="凌極世界・開場檔案" en="LINGJI WORLD · OPENING FILE" /></p>
        </div>
        <div className="space-y-5 px-6 py-7 sm:px-8">
          <h2 id="fiction-opening-title" className="text-2xl font-bold leading-tight text-white"><BilingualText zh={props.title} en={props.titleEn} block /></h2>
          <p className="whitespace-pre-line leading-8 text-slate-200"><BilingualText zh={props.excerpt} en={props.excerptEn || props.excerpt} block /></p>
          <button type="button" onClick={() => setOpen(false)} className="w-full rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition-transform duration-150 active:scale-[0.97] hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100">
            <BilingualText zh="進入文章" en="ENTER ARTICLE" />
          </button>
        </div>
      </section>
    </div>
  );
}
