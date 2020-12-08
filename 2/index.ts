import { readFile, joinPath } from '../helpers/FileHelper';

interface PasswordPolicy {
  requiredCharacter: string,
  floor: number,
  limit: number
}

interface Password {
  value: string,
  policy: PasswordPolicy
}

function validatePasswordPartOne(password: Password): boolean {
  const rx = new RegExp(password.policy.requiredCharacter, 'g');

  const result = password.value.match(rx);

  return result ? (result.length >= password.policy.floor) && (result.length <= password.policy.limit) : false;
}

function validatePasswordPartTwo(password: Password): boolean {
  const valueSplit = password.value.split('');

  // Toboggan Corporate Policies have no concept of "index zero"!
  // remove one from the floor and limit to get correct indexes
  return (valueSplit[password.policy.floor - 1] === password.policy.requiredCharacter) !== (valueSplit[password.policy.limit - 1] === password.policy.requiredCharacter)
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
  const input = readFile(joinPath(__dirname, 'input.txt'));
  const passwords = mapPasswords(input);

  // let validPasswords = passwords.filter(p => validatePasswordPartOne(p));

  let validPasswords = passwords.filter(p => validatePasswordPartTwo(p));

  console.log(validPasswords.length);

  return validPasswords;
}

main();
