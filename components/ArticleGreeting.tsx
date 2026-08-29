import BilingualText from '@/components/BilingualText';
import type { ArticleGreeting as ArticleGreetingData } from '@/lib/article-greetings';

export default function ArticleGreeting({ greeting, position }: { greeting: ArticleGreetingData; position: 'top' | 'bottom' }) {
  const label = position === 'top'
    ? { zh: '歡迎閱讀 INN NEWS', en: 'WELCOME TO INN NEWS' }
    : { zh: '感謝閱讀這篇報導', en: 'THANK YOU FOR READING' };

  return (
    <aside className={`article-greeting article-greeting--${position}`} aria-label={label.zh}>
      <span className="article-greeting-mark" aria-hidden="true">✦</span>
      <div className="article-greeting-copy">
        <strong className="article-greeting-label"><BilingualText zh={label.zh} en={label.en} /></strong>
        <span className="article-greeting-message"><BilingualText zh={greeting.zh} en={greeting.en} block /></span>
      </div>
    </aside>
  );
}
