import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const legacyManifestPath = path.join(distDir, 'manifest.json');
const vite5ManifestPath = path.join(distDir, '.vite', 'manifest.json');
const manifestPath = fs.existsSync(vite5ManifestPath)
  ? vite5ManifestPath
  : legacyManifestPath;

if (!fs.existsSync(manifestPath)) {
  console.error('manifest.json not found in dist/ (checked dist/manifest.json and dist/.vite/manifest.json). Make sure Vite is configured with build.manifest = true and run `npm run build`.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Create a simple mapping of input basename -> output file path (using relative paths)
const lookup = {};
for (const [key, info] of Object.entries(manifest)) {
  if (info.file) lookup[path.basename(key)] = `./assets/${path.basename(info.file)}`;
  if (info.css && info.css.length) lookup[`${path.basename(key)}.css`] = `./assets/${path.basename(info.css[0])}`;
}

// Find the built CSS file from manifest (it should be consistent across pages)
let builtCssPath = null;
for (const [key, info] of Object.entries(manifest)) {
  if (info.css && info.css.length > 0) {
    builtCssPath = `./assets/${path.basename(info.css[0])}`;
    break;
  }
}

const pages = ['index.html','about-us.html','services.html','approach.html','contact.html','privacy.html','terms.html','stack.html','404.html'];
for (const page of pages) {
  const pagePath = path.resolve(distDir, page);
  if (!fs.existsSync(pagePath)) {
    console.warn('Skipping missing page:', pagePath);
    continue;
  }
  let content = fs.readFileSync(pagePath, 'utf8');

  // 1. Remove any references to /src/styles or /src/scripts that might exist
  content = content.replace(/\s*<link rel="stylesheet" href="\/src\/styles\/[^"]*">\s*/g, '');
  content = content.replace(/\s*<script[^>]*src="\/src\/scripts\/[^"]*"><\/script>\s*/g, '');

  // 2. Always inject the CSS link right after <head> (before inline styles)
  if (builtCssPath) {
    if (!content.includes(`href="${builtCssPath}"`)) {
      const cssLink = `<link rel="stylesheet" href="${builtCssPath}">`;
      if (content.includes('<head>')) {
        // Insert right after <head> tag for priority over inline styles
        content = content.replace('<head>', `<head>\n    ${cssLink}`);
        console.log(`  Injected CSS: ${builtCssPath}`);
      } else {
        // Fallback: insert after <title> if <head> not found
        const titleMatch = content.match(/<title[^>]*>.*?<\/title>/);
        if (titleMatch) {
          const titleEnd = titleMatch.index + titleMatch[0].length;
          content = content.slice(0, titleEnd) + '\n    ' + cssLink + content.slice(titleEnd);
          console.log(`  Injected CSS: ${builtCssPath}`);
        }
      }
    }
  }

  // 3. Rewrite all /src/scripts references to use built assets from manifest
  const scriptMapping = {};
  
  // Find main JS bundle
  let mainJsPath = null;
  for (const [key, info] of Object.entries(manifest)) {
    if (key === 'main.html' && info.file) {
      mainJsPath = `./assets/${path.basename(info.file)}`;
    }
  }
  
  // If no main.html entry, find any entry JS file
  if (!mainJsPath) {
    for (const [key, info] of Object.entries(manifest)) {
      if (key.endsWith('.html') && info.file && !key.includes('node_modules')) {
        mainJsPath = `./assets/${path.basename(info.file)}`;
        break;
      }
    }
  }
  
  // Map all script sources to the main JS bundle
  const commonScripts = ['theme.js', 'skin.js', 'a11y.js', 'main.js', 'tabs.js', 'tweakcn-preview.js'];
  for (const script of commonScripts) {
    scriptMapping[`/src/scripts/${script}`] = mainJsPath || './assets/main.js';
  }
  
  // Map approach.js if there's an approach bundle
  scriptMapping['/src/scripts/approach.js'] = mainJsPath || './assets/main.js';

  for (const [src, dest] of Object.entries(scriptMapping)) {
    if (dest) {
      content = content.replace(new RegExp(src.replace(/\./g, '\\.'), 'g'), dest);
    }
  }

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Patched', page);
}

console.log('postbuild: finished patching HTML pages.');
