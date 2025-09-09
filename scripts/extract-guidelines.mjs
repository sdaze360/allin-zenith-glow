import fs from 'fs/promises';
import path from 'path';

const pdfPath = path.resolve(process.cwd(), 'public', 'Allin Brand guidelines.pdf');
const outPath = path.resolve(process.cwd(), 'public', 'brand-guidelines.txt');

async function main() {
  try {
    const pdfModule = await import('pdf-parse');
    const pdf = pdfModule.default || pdfModule;
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdf(dataBuffer);
    await fs.writeFile(outPath, data.text, 'utf8');
    console.log(`Extracted text to: ${outPath}`);
  } catch (err) {
    console.error('Failed to extract PDF text:', err.message || err);
    process.exit(1);
  }
}

main();


