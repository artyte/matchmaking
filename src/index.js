/* eslint-disable no-console */
// import readline from 'readline';
// import process from 'node:process';
import {
  bins,
  serverNum,
  filePath,
  queueClients,
  matchClients,
  endAndPoll,
  playersPerTeam,
} from './config';
import Client from './matchmaking/Client';
import Director from './matchmaking/Director';
import MatchmakerImpl from './matchmaking/MatchmakerImpl';

console.log(`Loading file data: ${filePath}...`);
const client = new Client(filePath);

console.log('Creating servers...');
const director = new Director(serverNum);

console.log('Creating matchmaker...');
const matchMaker = new MatchmakerImpl(bins);

const activeMatches = [];
setInterval(() => {
  console.log('Client queueing a player...');
  client.queue(matchMaker);
}, queueClients);

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
    } else {
      console.log('No available servers, going back to queue...');
      const team1 = match.getTeam1();
      const team2 = match.getTeam2();
      team1.forEach((player) => matchMaker.backToMatchmaking(player));
      team2.forEach((player) => matchMaker.backToMatchmaking(player));
    }
  }
}, matchClients);

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
}, endAndPoll);


// process.on('exit', (code) => {
//   console.log(`Shows stats here`);
// });