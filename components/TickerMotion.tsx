'use client';

import { type ReactNode, useEffect, useRef } from 'react';

export default function TickerMotion({ children, className }: { children: ReactNode; className: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let frame = 0;
    let lastTime = 0;
    let offset = 0;
    let running = false;
    const pixelsPerSecond = 22;

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };

    const tick = (time: number) => {
      if (!running) return;
      if (!lastTime) lastTime = time;
      const elapsed = Math.min(time - lastTime, 80);
      lastTime = time;
      offset -= (pixelsPerSecond * elapsed) / 1000;

      const loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0 && -offset >= loopWidth) offset += loopWidth;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    track.style.setProperty('animation', 'none', 'important');
    track.style.setProperty('will-change', 'transform');

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) start();
          else stop();
        }, { threshold: 0 })
      : null;

    if (observer) observer.observe(track);
    else start();

    return () => {
      stop();
      observer?.disconnect();
      track.style.removeProperty('transform');
      track.style.removeProperty('animation');
      track.style.removeProperty('will-change');
    };
  }, []);

  return <div ref={trackRef} className={className}>{children}</div>;
}
