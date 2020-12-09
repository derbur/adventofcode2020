import os from 'os';
import path from "path";
import { readFile } from "../helpers/FileHelper";

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid' optional
]

function validateFields(s: string): boolean {
  let valid = true;
  requiredFields.forEach(f => {
    let re = `${f}:`;
    if(!s.includes(re)) {
      return valid = false;
    }
  });
  return valid;
}

function main() {
  let passports = readFile(path.join(__dirname, 'input.txt'), os.EOL + os.EOL);
  const validPassports = passports.filter(p => validateFields(p));
  
  console.log(validPassports.length);
  return validPassports;
}

main();