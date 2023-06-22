import { program } from 'commander';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-t, --team <type>', 'select players per team: 3/5. default: 3');
program.parse(process.argv);
const options = program.opts();

export const playersPerTeam = options.team ? Number(options.team) : 3;
export const bins = [
  // [1000, 1300, playersPerTeam],
  [1300, 1500, playersPerTeam],
  [1500, 1700, playersPerTeam],
  [1700, 2001, playersPerTeam],
];
export const serverNum = 10;
export const filePath = options.file ? options.file : './data/sample-data.json';

const microSecondScalar = 1000;
export const queueClients = 0.1 * microSecondScalar;
export const matchClients = 2 * microSecondScalar;
export const endClientMatches = 60 * microSecondScalar;
export const updateClientPlayers = 2 * microSecondScalar;