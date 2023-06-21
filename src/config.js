import { program } from 'commander';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-t, --team <type>', 'select players per team: 3/5. default: 3');
program.parse(process.argv);
const options = program.opts();

export const playersPerTeam = options.team ? Number(options.team) : 3;
export const bins = [
  [0, 1000, playersPerTeam],
  [1000, 1300, playersPerTeam],
  [1300, 1500, playersPerTeam],
  [1500, 1700, playersPerTeam],
  [1700, 2001, playersPerTeam],
];
export const serverNum = 1;
export const filePath = options.file ? options.file : './data/sample-data.json';

export const queueClients = 1000;
export const matchClients = 5000;
export const endClientMatches = 10000;
export const updateClientPlayers = 1000;