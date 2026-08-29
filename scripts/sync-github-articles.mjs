import { cp, mkdtemp, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const execFileAsync = promisify(execFile);
const owner = 'hxgucjuu-alt';
const repo = 'inn-news-portal';
const branch = 'main';
const token = process.env.GITHUB_TOKEN || '';
const projectRoot = process.cwd();
const targetArticles = join(projectRoot, 'content', 'articles');
const requestHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function directoryExists(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function syncArticles() {
  const tempRoot = await mkdtemp(join(tmpdir(), 'inn-github-'));
  const archivePath = join(tempRoot, 'repository.tar.gz');
  const extractRoot = join(tempRoot, 'repository');

  try {
    const archiveUrl = `https://api.github.com/repos/${owner}/${repo}/tarball/${encodeURIComponent(branch)}`;
    const response = await fetch(archiveUrl, { headers: requestHeaders, redirect: 'follow' });
    if (!response.ok) {
      throw new Error(`GitHub archive request failed: ${response.status} ${response.statusText}`);
    }

    await writeFile(archivePath, new Uint8Array(await response.arrayBuffer()));
    await execFileAsync('mkdir', ['-p', extractRoot]);
    await execFileAsync('tar', ['-xzf', archivePath, '-C', extractRoot]);

    const roots = await readdir(extractRoot, { withFileTypes: true });
    const repositoryRootEntry = roots.find(entry => entry.isDirectory());
    if (!repositoryRootEntry) throw new Error('GitHub archive did not contain a repository directory');

    const sourceArticles = join(extractRoot, repositoryRootEntry.name, 'content', 'articles');
    if (!(await directoryExists(sourceArticles))) {
      throw new Error('GitHub archive does not contain content/articles');
    }

    const sourceEntries = await readdir(sourceArticles, { withFileTypes: true });
    const markdownCount = sourceEntries.filter(entry => entry.isFile() && entry.name.endsWith('.md')).length;
    if (!markdownCount) throw new Error('GitHub archive contained no Markdown articles');

    await rm(targetArticles, { recursive: true, force: true });
    await cp(sourceArticles, targetArticles, { recursive: true });
    console.log(`[github-sync] synced ${markdownCount} articles from ${owner}/${repo}@${branch}`);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

try {
  await syncArticles();
} catch (error) {
  console.warn(`[github-sync] keeping existing local articles: ${error instanceof Error ? error.message : String(error)}`);
}
