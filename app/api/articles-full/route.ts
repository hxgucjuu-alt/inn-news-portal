import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/posts';

// Full-text variant of /api/articles (includes content / contentEn) for the search page,
// which filters over article bodies in the browser. Other consumers should use /api/articles.
export const dynamic = 'force-static';
export const revalidate = 300;

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
