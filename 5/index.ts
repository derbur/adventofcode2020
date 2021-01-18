import os from 'os';
import path from "path";
import { readFile } from "../helpers/FileHelper";

interface SeatMapConfig {
  rowConfig: string[],
  columnConfig: string[]
}

interface SeatMap {
  row: number,
  column: number
}

function parseSeatMapConfig(stringMap: string): SeatMapConfig {
  let splitMap = stringMap.split('');
  return {
    rowConfig: splitMap.slice(0, 7),
    columnConfig: splitMap.slice(7)
  }
}

function getSeatId(row: number, column: number) {
  return row * 8 + column;
}

function getSeatMap(config: SeatMapConfig): SeatMap {
  let rows = Array.from(Array(128).keys());
  let columns = Array.from(Array(8).keys());
  
  config.rowConfig.forEach(i => {
    if(i === 'F') {
      rows = rows.slice(0, rows.length / 2);
    } else {
      rows = rows.slice(rows.length / 2);
    }
  });

  config.columnConfig.forEach(i => {
    if(i === 'L') {
      columns = columns.slice(0, columns.length / 2);
    } else {
      columns = columns.slice(columns.length / 2);
    }
  })


  return {
    row: rows[0],
    column: columns[0]
  }
}

function findYourSeat(seatIds: number[]): number[] {
  let possibleIds = [];
  for(let i = 0; i < seatIds.length - 1; i++) {
    if(seatIds[i + 1] - seatIds[i] == 2) {
      possibleIds.push(seatIds[i] + 1);
    }
  }
  return possibleIds;
}

function main() {
  // this could all be done via string as well

  let seatInput = readFile(path.join(__dirname, 'input.txt'), os.EOL);

  let seatIds = seatInput.map(si => parseSeatMapConfig(si))
                         .map(sc => getSeatMap(sc))
                         .map(sm => getSeatId(sm.row, sm.column))
                         .sort((a, b) => a - b)

  // Largest seat id
  console.log('Highest SeatID:', seatIds[seatIds.length - 1]);
  // Your seat id
  console.log('Your SeatID:', findYourSeat(seatIds));

  // test data
  // let seatMapString = 'FBFBBFFRLR';
  // let seatMapConfig = parseSeatMapConfig(seatMapString);
  // let seatMap = getSeatMap(seatMapConfig);
  // console.log(`Seat: ${seatMap}\nId: ${getSeatId(seatMap.row, seatMap.column)}`);
}

main();