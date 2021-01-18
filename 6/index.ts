import os from 'os';
import path from "path";
import { readFile } from "../helpers/FileHelper";

interface AnswerMap {
  [key: string]: number
}

function getUniqueAnswerSum(ans: string[]) {
  return ans.reduce((acc, curr) => {
    // 🤔
    let uniq = new Set([...(curr.split(os.EOL).flat().join('').split(''))]);
    return acc + uniq.size;
  }, 0);
}

function getAllAnswerSum(ans: string[]) {
  return ans.reduce((acc, curr) => {
    let splitAns = curr.split(os.EOL);
    let ansMap: AnswerMap = {};
    splitAns.forEach(answer => {
      for(let i = 0; i < answer.length; i++) {
        let n = ansMap[answer.charAt(i)];
        ansMap[answer.charAt(i)] = n ? ++n : 1;
      }
    });
    // console.log(splitAns, ansMap);
    return acc + Object.values(ansMap).filter(v => v === splitAns.length).length;
  }, 0);
}

function main() {
  let input = readFile(path.join(__dirname, 'input.txt'), os.EOL + os.EOL);
  console.log('UNIQUE ANSWERS:', getUniqueAnswerSum(input));
  console.log('ALL ANSWERED YES:', getAllAnswerSum(input));
}

main();