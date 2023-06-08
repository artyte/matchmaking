import { program as program } from 'commander';
import fs from 'fs';
import path from 'path';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-m, --match <type>', 'select between 1v1, 3v3, 5v5. default: 1v1');

program.parse(process.argv);

const options = program.opts();

var truePath = './data';

if (options.file) {
  console.log(`Loading file data:${options.file}`);
  truePath = options.file;
} else {
  console.log(`Loading default json file`);
  truePath = path.join('./data', 'sample-data.json');
}

const raw = fs.readFileSync(truePath);
const data = JSON.parse(raw);
console.log(data);

if (options.match && ['1v1', '3v3', '5v5'].includes(options.match)) {
  console.log(`Using ${options.match} match format`);
} else {
  console.log('Using default 1v1 match format');
}
