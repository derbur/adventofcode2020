import { dir } from 'console';
import fs from 'fs';
import os from 'os';
import path from 'path';

function readFile(fileName: string): string[] {
  const fileBuffer = fs.readFileSync(fileName);
  const fileString = fileBuffer.toString().split(os.EOL);

  return fileString;
}

function joinPath(directory: string, fileName: string): string {
  return path.resolve(directory, fileName);
}

export { readFile, joinPath };