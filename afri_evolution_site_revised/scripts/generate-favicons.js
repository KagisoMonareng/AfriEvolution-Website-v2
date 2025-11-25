import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import pngToIco from 'png-to-ico';

// Input source logo
const srcLogo = path.resolve(process.cwd(), 'images', 'logo.png');
const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(srcLogo)) {
  console.error('Source logo not found at images/logo.png. Please add it and rerun.');
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generate() {
  try {
    // 32x32 PNG
    const png32 = path.join(outDir, 'favicon-32x32.png');
    await sharp(srcLogo).resize(32, 32).png({ quality: 90 }).toFile(png32);

    // Apple touch icon 180x180
    const apple = path.join(outDir, 'apple-touch-icon.png');
    await sharp(srcLogo).resize(180, 180).png({ quality: 90 }).toFile(apple);

    // Create ICO from multiple sizes (16,32)
    const png16 = path.join(outDir, 'favicon-16x16.png');
    await sharp(srcLogo).resize(16, 16).png({ quality: 90 }).toFile(png16);

    const icoPath = path.join(outDir, 'favicon.ico');
    const icoBuffer = await pngToIco([png16, png32]);
    fs.writeFileSync(icoPath, icoBuffer);

    console.log('Favicons generated in', outDir);
  } catch (err) {
    console.error('Error generating favicons:', err);
    process.exit(1);
  }
}

generate();
