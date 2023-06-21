/* eslint-disable no-console */
import { program } from 'commander';
import path from 'path';
import readline from 'readline';
import Client from './matchmaking/Client';
import Director from './matchmaking/Director';
import MatchmakerImpl from './matchmaking/MatchmakerImpl';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-t, --team <type>', 'select players per team: 3/5. default: 3');

program.parse(process.argv);

const options = program.opts();

var client;
var truePath = './data';
if (options.file) {
  console.log(`Loading file data:${options.file}...`);
  truePath = options.file;
  client = new Client(truePath);
} else {
  console.log('Loading default json file...');
  truePath = path.join('./data', 'sample-data.json');
  client = new Client(truePath);
}
// client.getLoad();

console.log('Creating servers...');
const director = new Director(100);

console.log('Creating matchmaker...');
var playersPerTeam;
if (options.match && ['3', '5'].includes(options.match)) {
  console.log(`Using ${options.match} match format`);
  playersPerTeam = Number(options.match);
} else {
  console.log('Using default 3v3 match format');
  playersPerTeam = 3;
}

const bins = [
  [0, 1000, playersPerTeam],
  [1000, 1300, playersPerTeam],
  [1300, 1500, playersPerTeam],
  [1500, 1700, playersPerTeam],
  [1700, 2000, playersPerTeam],
];
const matchMaker = new MatchmakerImpl(bins);

process.on('exit', () => {
  console.log('Exited!');
});
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));

// process.on('exit', () => {
//   console.log('Exited!');
// });
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.on('keypress', process.exit(1));
// const init = async () => {
//   while (true) {
//     console.log('In while loop');
//   }
// };

// init();
