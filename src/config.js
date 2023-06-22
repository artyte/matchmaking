import { program } from 'commander';

program
  .option('-f, --file <type>', 'use a json file as data')
  .option('-t, --team <type>', 'select players per team: 3/5. default: 3')
  .option('-s, --servers <type>', 'number of servers to create. default: 10')
  .option('-q, --queueclient <type>', 'number of seconds between each client queueing. default: 0.1')
  .option('-m, --matchclient <type>', 'number of seconds between each client matching. default: 2')
  .option('-e, --endmatch <type>', 'number of seconds between ending a match. default: 60')
  .option('-u, --updateclient <type>', 'number of seconds between updating all clients. default: 2');
program.parse(process.argv);
const options = program.opts();

export const playersPerTeam = options.team ? Number(options.team) : 3;
export const bins = [
  // [1000, 1300, playersPerTeam],
  [1300, 1500, playersPerTeam],
  [1500, 1700, playersPerTeam],
  [1700, 2001, playersPerTeam],
];
export const serverNum = options.servers ? Number(options.servers) : 10;
export const filePath = options.file ? options.file : './data/sample-data.json';

const microSecondScalar = 1000;
export const queueClients = options.queueclient
  ? Number(options.queueclient) * microSecondScalar
  : 0.1 * microSecondScalar;
export const matchClients = options.matchclient
  ? Number(options.matchclient) * microSecondScalar
  : 2 * microSecondScalar;
export const endClientMatches = options.endmatch
  ? Number(options.endmatch) * microSecondScalar
  : 60 * microSecondScalar;
export const updateClientPlayers = options.updateclient
  ? Number(options.updateclient) * microSecondScalar
  : 2 * microSecondScalar;