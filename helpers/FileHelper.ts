import fs from 'fs';
import os from 'os';
import path from 'path';


function readFile(fileName: string): string[];
function readFile(fileName: string, splitString: string): string[];
function readFile(fileName: string, splitString?: string): string[] {
  let fileParts: string[];

  if (!splitString) {
    const fileBuffer = fs.readFileSync(fileName);
    fileParts = fileBuffer.toString().split(os.EOL);
  } else {
    const fileBuffer = fs.readFileSync(fileName);
    fileParts = fileBuffer.toString().split(splitString);
  }

  return fileParts;
}

function joinPath(directory: string, fileName: string): string {
  return path.resolve(directory, fileName);
}

export { readFile, joinPath };