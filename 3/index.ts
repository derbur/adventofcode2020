import { readFile, joinPath } from '../helpers/FileHelper';

interface Position {
  row: number,
  column: number
}

const slope = [ 3, 1 ];

function findTrees(paths: string[][], currentPosition: Position): number {
  //short circut
  if(currentPosition.row === paths.length - 1) return 0;

  let nextPosition: Position = { row: currentPosition.row + slope[1], column: currentPosition.column + slope[0] };

  // if we're going to run out of spots, wrap around
  if(nextPosition.column >= paths[currentPosition.row].length) {
    let newColumn = Math.abs(nextPosition.column - paths[currentPosition.row].length);
    nextPosition.column = newColumn;
  }

  // if we find a tree, count it
  if(paths[nextPosition.row][nextPosition.column] === '#') {
    return findTrees(paths, nextPosition) + 1;
  } else {
    return findTrees(paths, nextPosition);
  }
}

function main() {
  const input = readFile(joinPath(__dirname, 'input.txt'));
  const paths = input.map(p => p.split(''));
  let startingPosition: Position = { row: 0, column: 0 };

  let treesFound = findTrees(paths, startingPosition);
  
  console.log(treesFound);
  return treesFound;
}

main();
