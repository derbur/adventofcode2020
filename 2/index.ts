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
  const input = readFile('input.txt').split('\r\n');
  const passwords = mapPasswords(input);

  console.log(passwords);
}

main();