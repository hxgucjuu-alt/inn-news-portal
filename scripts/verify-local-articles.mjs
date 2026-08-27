import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const articlesDir = join(process.cwd(), 'content', 'articles');

async function verifyLocalArticles() {
  let entries;
  try {
    entries = await readdir(articlesDir, { withFileTypes: true });
  } catch {
    throw new Error('Git checkout does not contain content/articles');
  }

  const markdownArticles = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const filePath = join(articlesDir, entry.name);
    if ((await stat(filePath)).size > 0) markdownArticles.push(entry.name);
  }

  if (!markdownArticles.length) {
    throw new Error('Git checkout contains no non-empty Markdown articles');
  }

  console.log(`[article-build-input] verified ${markdownArticles.length} local Git checkout articles`);
}

await verifyLocalArticles();
