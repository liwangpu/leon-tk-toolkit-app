import fs from 'fs';
import path from 'node:path';

export function getExternalScript(fileName: string) {
  const filePath = path.join(__dirname, fileName);
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}
