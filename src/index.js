/* eslint-disable no-console */
import { program } from 'commander';
import path from 'path';
// import readline from 'readline';
import process from 'node:process';
import Client from './matchmaking/Client';
import Director from './matchmaking/Director';
import MatchmakerImpl from './matchmaking/MatchmakerImpl';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-t, --team <type>', 'select players per team: 3/5. default: 3');

program.parse(process.argv);

const options = program.opts();

let client;
let truePath = './data';
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
const director = new Director(1);

console.log('Creating matchmaker...');
let playersPerTeam;
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
  [1700, 2001, playersPerTeam],
];
const matchMaker = new MatchmakerImpl(bins);
const activeMatches = [];

setInterval(() => {
  console.log('Client queueing a player...');
  client.queue(matchMaker);
}, 1000);

setInterval(() => {
  console.log('Finding a match...');
  const match = matchMaker.findMatch(playersPerTeam);
  if (!match) console.log('Not enough players...');
  else {
    const assign = director.startMatch(match);
    if (assign) {
      activeMatches.push(match);
      console.log(match);
      console.log('Match starting...');
    }
    else {
      console.log('No available servers, going back to queue...');
      const team1 = match.getTeam1();
      const team2 = match.getTeam2();
      team1.forEach((player) => matchMaker.backToMatchmaking(player));
      team2.forEach((player) => matchMaker.backToMatchmaking(player));
    }
  }
}, 5000);

setInterval(() => {
  const match = activeMatches.pop();

  if (!match) console.log('No matches to end...');
  else {
    console.log('Ending a match...');
    const ended = director.endMatch(match);
    if (ended) {
      console.log(match);
      console.log('Match ended...');
    }
  }  

  console.log('Updating players in client...');
  client.poll(director);
}, 10000);


process.on('exit', (code) => {
  console.log(`Shows stats here`);
});