'use client';

import { useEffect, useState } from 'react';
import BilingualText from './BilingualText';
import { getDailyGreeting } from '@/lib/daily-greetings';

type Greeting = {
  zh: string;
  en: string;
};

const DEFAULT_GREETING: Greeting = {
  zh: '問候訊號已連線',
  en: 'GREETING SIGNAL ONLINE',
};

function getLocalHour(date: Date) {
  return date.getHours();
}

function getGreeting(date: Date): Greeting {
  const hour = getLocalHour(date);
  if (hour < 5) return { zh: '凌晨好', en: 'GOOD EARLY MORNING' };
  if (hour < 12) return { zh: '早安', en: 'GOOD MORNING' };
  if (hour < 18) return { zh: '午安', en: 'GOOD AFTERNOON' };
  return { zh: '晚安', en: 'GOOD EVENING' };
}

function millisecondsUntilNextHour(date: Date) {
  return Math.max(1000, (60 - date.getMinutes()) * 60_000 - date.getSeconds() * 1000 - date.getMilliseconds());
}

export default function TimeGreeting() {
  const [greeting, setGreeting] = useState<Greeting>(DEFAULT_GREETING);
  const [dailyGreeting, setDailyGreeting] = useState(DEFAULT_GREETING);

  useEffect(() => {
    let timer: number | undefined;
    let cancelled = false;

    const refresh = () => {
      if (cancelled) return;
      const now = new Date();
      setGreeting(getGreeting(now));
      setDailyGreeting(getDailyGreeting(now));
      timer = window.setTimeout(refresh, millisecondsUntilNextHour(now));
    };

    refresh();
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="home-greeting" aria-live="polite">
      <span className="home-greeting-label">INN // TIME SIGNAL</span>
      <strong><BilingualText zh={greeting.zh} en={greeting.en} /></strong>
      <span className="home-daily-greeting"><BilingualText zh={dailyGreeting.zh} en={dailyGreeting.en} /></span>
    </div>
  );
}
