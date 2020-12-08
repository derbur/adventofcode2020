import { readFile, joinPath } from '../helpers/FileHelper';

interface Position {
  row: number,
  column: number
}


function findTrees(slope: number[], paths: string[][], currentPosition: Position): number {
  //short circut
  if(currentPosition.row >= paths.length - 1) return 0;

  let nextPosition: Position = { row: currentPosition.row + slope[1], column: currentPosition.column + slope[0] };

  // if we're going to run out of spots, wrap around
  if(nextPosition.column >= paths[currentPosition.row].length) {
    let newColumn = Math.abs(nextPosition.column - paths[currentPosition.row].length);
    nextPosition.column = newColumn;
  }

  // if we find a tree, count it
  if(paths[nextPosition.row][nextPosition.column] === '#') {
    return findTrees(slope, paths, nextPosition) + 1;
  } else {
    return findTrees(slope, paths, nextPosition);
  }
}

function main() {
  const input = readFile(joinPath(__dirname, 'input.txt'));
  const paths = input.map(p => p.split(''));
  let startingPosition: Position = { row: 0, column: 0 };
  // const slope = [ 3, 1 ];
  const slopes = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
  ]

  // pt.1
  // let treesFound = findTrees(slope, paths, startingPosition);j

  // pt.2
  let trees = slopes.map(s => findTrees(s, paths, startingPosition));
  let treesFound = trees.reduce((p, c) => p * c);
  
  console.log(treesFound);
  return treesFound;
}

main();
