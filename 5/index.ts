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
    rowConfig: splitMap.slice(0, 6),
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

function main() {
  let seatInput = readFile(path.join(__dirname, 'input.txt'), os.EOL);
  let seatConfigs = seatInput.map(si => parseSeatMapConfig(si));
  let seatMaps = seatConfigs.map(sc => getSeatMap(sc));
  let seatIds = seatMaps.map(sm => getSeatId(sm.row, sm.column)).sort((a, b) => b -a);

  // Largest seat id
  console.log(seatIds[0]);

  // test data
  // let seatMapString = 'FBFBBFFRLR';
  // let seatMapConfig = parseSeatMapConfig(seatMapString);
  // let seatMap = getSeatMap(seatMapConfig);
  // console.log(`Seat: ${seatMap}\nId: ${getSeatId(seatMap.row, seatMap.column)}`);
}

main();