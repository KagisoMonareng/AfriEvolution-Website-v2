import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const hostname = 'https://www.afrievolution.com';
const now = new Date().toISOString();

function isIgnoredDir(name) {
  return ['node_modules', '.git', 'dist', 'public'].includes(name);
}

function collectHtml(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    if (it.isDirectory()) {
      if (isIgnoredDir(it.name)) continue;
      results = results.concat(collectHtml(path.join(dir, it.name)));
    } else if (it.isFile() && it.name.endsWith('.html')) {
      results.push(path.join(dir, it.name));
    }
  }
  return results;
}

const htmlFiles = collectHtml(process.cwd());

const urlEntries = htmlFiles.map(f => {
  // derive URL path from project-relative file
  const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');
  let urlPath = '/' + rel;
  if (urlPath.endsWith('index.html')) {
    urlPath = urlPath.replace(/index\.html$/, '');
  }
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;

  let lastmod = now;
  try {
    const stat = fs.statSync(f);
    lastmod = stat.mtime.toISOString();
  } catch (e) {}

  return `  <url>\n    <loc>${hostname}${urlPath}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Wrote', path.join(distDir, 'sitemap.xml'));
