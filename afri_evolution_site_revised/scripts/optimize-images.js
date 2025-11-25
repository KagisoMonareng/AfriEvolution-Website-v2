import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve(process.cwd(), 'images');
const outDir = path.resolve(process.cwd(), 'public', 'images');
if (!fs.existsSync(srcDir)) {
  console.error('No images directory found at ./images');
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function processImage(file) {
  const name = path.parse(file).name;
  const inPath = path.join(srcDir, file);
  const outWebp = path.join(outDir, `${name}.webp`);
  try {
    await sharp(inPath)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toFile(outWebp);
    console.log('Optimized', file, '->', outWebp);
  } catch (e) {
    console.error('Failed to optimize', file, e);
  }
}

async function run() {
  const files = fs.readdirSync(srcDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const f of files) {
    await processImage(f);
  }
  console.log('Image optimization complete.');
}

run();
