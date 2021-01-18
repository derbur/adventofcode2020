import os from 'os';
import path from "path";
import { readFile } from "../helpers/FileHelper";

function getAnswerSum(ans: string[]) {
  return ans.reduce((acc, curr) => {
    // 🤔
    let uniq = new Set([...(curr.split(os.EOL).flat().join('').split(''))]);
    return acc + uniq.size;
  }, 0);
}

function main() {
  let input = readFile(path.join(__dirname, 'input.txt'), os.EOL + os.EOL);
  console.log(getAnswerSum(input));
}

main();