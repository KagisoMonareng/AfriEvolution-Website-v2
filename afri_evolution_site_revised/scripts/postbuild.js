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

// Create a simple mapping of input basename -> output file path
const lookup = {};
for (const [key, info] of Object.entries(manifest)) {
  if (info.file) lookup[path.basename(key)] = `/dist/${info.file}`;
  if (info.css && info.css.length) lookup[`${path.basename(key)}.css`] = `/dist/${info.css[0]}`;
}

const pages = ['index.html','about-us.html','services.html','approach.html','contact.html'];
for (const page of pages) {
  const pagePath = path.resolve(process.cwd(), page);
  if (!fs.existsSync(pagePath)) {
    console.warn('Skipping missing page:', pagePath);
    continue;
  }
  let content = fs.readFileSync(pagePath, 'utf8');

  // Replace known /src/styles and /src/scripts references naively using base names
  for (const [k, out] of Object.entries(lookup)) {
    const reStyles = new RegExp(`/src/styles/${k}`, 'g');
    const reScripts = new RegExp(`/src/scripts/${k}`, 'g');
    content = content.replace(reStyles, out);
    content = content.replace(reScripts, out);
  }

  // Replace placeholder built CSS comment with actual if there's a single main css asset
  // (optional enhancement: find the largest css file in /dist/assets and use it)

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Patched', page);
}

console.log('postbuild: finished patching HTML pages. Verify asset references point to /dist/ files.');
