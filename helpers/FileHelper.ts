import fs from 'fs';

function readFile(fileName: string): string {
  const fileBuffer = fs.readFileSync(fileName);
  const fileString = fileBuffer.toString();

  return fileString;
}

export { readFile };