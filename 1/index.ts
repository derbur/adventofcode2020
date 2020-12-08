import { readFile } from '../helpers/FileHelper';

function find2020(numbers: number[]): number[] {
  let x = 0;
  let y = 1;
  let twentyTwenty: number[] = [];

  // short circut if numbers are found or if the end of the array is reached
  while (!twentyTwenty.length && y !== numbers.length) {
    for (y; y < numbers.length;) {
      if(numbers[x] + numbers[y] === 2020) {
        twentyTwenty = [ numbers[x], numbers[y] ];
        break;
      }
      y++;
    }
    x++;
    y = x+1;
  }

  return twentyTwenty;
}

function main() {
  const fileText = readFile(`${__dirname}\\input.txt`);
  const input: number[] = fileText.split('\r\n').map(i => parseInt(i));

  const [a, b] = find2020(input);

  if(a && b) {
    const answer = a * b;
  
    console.log(answer);
    return answer;
  } else {
    console.error('2020 not found');
    return -1;
  }
}

main();
