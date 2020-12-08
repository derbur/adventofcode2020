import { readFile } from '../helpers/FileHelper';

interface PasswordPolicy {
  requiredCharacter: string,
  floor: number,
  limit: number
}

interface Password {
  value: string,
  policy: PasswordPolicy
}

function validatePassword(password: Password): boolean {
  const rx = new RegExp(password.policy.requiredCharacter, 'g');

  const result = password.value.match(rx);

  return result ? (result.length >= password.policy.floor) && (result.length <= password.policy.limit) : false;
}

function mapPolicy(policyChunk: string): PasswordPolicy {
  let [range, characterInfo] = policyChunk.split(' ');
  const character = characterInfo.replace(':', '').trim();
  const [min, max] = range.split('-').map(num => parseInt(num));

  let policy = { 
    requiredCharacter: character,
    floor: min,
    limit: max
  };

  return policy;
}

function mapPasswords(passwordChunks: string[]) : Password[] {
  let passwords: Password[] = [];

  passwordChunks.forEach(p => {
    let [policyChunk, value] = p.split(':');
    const policyInfo = mapPolicy(policyChunk);

    let password = {
      value: value.trim(),
      policy: policyInfo
    }

    passwords.push(password);
  });
  
  return passwords;
}

function main() {
  const input = readFile(`${__dirname}\\input.txt`).split('\r\n');
  const passwords = mapPasswords(input);

  let validPasswords = passwords.filter(p => validatePassword(p));

  console.log(validPasswords.length);

  return validPasswords;
}

main();
// TODO:
// https://adventofcode.com/2020/day/2#part2
