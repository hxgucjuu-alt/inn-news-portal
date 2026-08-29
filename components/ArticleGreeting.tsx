import BilingualText from '@/components/BilingualText';
import type { ArticleGreeting as ArticleGreetingData } from '@/lib/article-greetings';

export default function ArticleGreeting({ greeting, position }: { greeting: ArticleGreetingData; position: 'top' | 'bottom' }) {
  return (
    <aside className={`article-greeting article-greeting--${position}`} aria-label="閱讀問候">
      <span className="article-greeting-mark" aria-hidden="true">✦</span>
      <BilingualText zh={greeting.zh} en={greeting.en} block />
    </aside>
  );
}
