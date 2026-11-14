import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/posts';

// Static export compatibility: the endpoint is generated at build time from the same GitHub article source.
// Slim index: article bodies (content / contentEn) are served separately at /api/articles-full,
// so list-style consumers (tags page, external tickers) don't download ~6 MB of full text.
export const dynamic = 'force-static';
export const revalidate = 300;

export async function GET() {
  try {
    const articles = await getAllArticles();
    const index = articles.map(({ content, contentEn, ...rest }) => rest);
    return NextResponse.json({ articles: index });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
