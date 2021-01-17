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

interface Passport {
  [key: string]: string
}

let fieldRex = new RegExp(`${os.EOL}|\\s`, 'g'); // used to isolate fields in passports delineated by newlines and spaces

function passportMapper(f: string): Passport {
  let pp: Passport = {};
  f.split(fieldRex).forEach(field => { 
    let [ key, value ] = field.split(':');    
    pp[key] = value;
  });
  return pp;
}

function passportFieldValidator(pp: Passport): boolean {
  if(!(parseInt(pp['byr']) >= 1920 && parseInt(pp['byr']) <= 2002)) return false;
  if(!(parseInt(pp['iyr']) >= 2010 && parseInt(pp['iyr']) <= 2020)) return false;
  if(!(parseInt(pp['eyr']) >= 2020 && parseInt(pp['eyr']) <= 2030)) return false;
  let hgtMatch = pp['hgt'].match(/^(\d{1,})(cm|in)$/);
  if(!hgtMatch) return false;
  switch(hgtMatch[2]) {
    case 'cm':
      if(!(parseInt(hgtMatch![1]) >= 150 && parseInt(hgtMatch![1]) <= 193)) return false;
      break;
    case 'in':
      if(!(parseInt(hgtMatch![1]) >= 59 && parseInt(hgtMatch![1]) <= 76)) return false;
      break;
  }
  if(!pp['hcl'].match(/^#[0-9,a-f]{6}$/)) return false;
  if(!pp['ecl'].match(/^(amb|blu|brn|gry|grn|hzl|oth){1}$/)) return false;
  if(!pp['pid'].match(/^\d{9}$/)) return false;
  return true;
}

function validateFields(s: string): boolean {
  let valid = true;
  requiredFields.forEach(f => {
    let re = `${f}:`;
    if(!s.includes(re)) {
      return valid = false;
    }
  });
  // validate field values
  if(valid) {
    let mapped = passportMapper(s);
    return passportFieldValidator(mapped);
  } else {
    return false;
  }
}

function main() {
  let passports = readFile(path.join(__dirname, 'input.txt'), os.EOL + os.EOL);

  const validPassports = passports.filter(p => validateFields(p));
  
  console.log(validPassports.length);
  return validPassports;
}

main();