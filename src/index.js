import { program as program } from 'commander';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-m, --match <type>', 'select between 1v1, 3v3, 5v5. default: 1v1');

program.parse(process.argv);

const options = program.opts();

if (options.file) {
  console.log(`Loading file data:${options.file}`);
} else {
  console.log(`Loading default json file`);
}

if (options.match && ['1v1', '3v3', '5v5'].includes(options.match)) {
  console.log(`Using ${options.match} match format`);
} else {
  console.log('Using default 1v1 match format');
}
