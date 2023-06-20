/**
 * Takes from the Matchmaker class's returned matches and assigns them
 * to a server.
 *
 * This class is also queried by the Client class to get player playing
 * status.
 */
export default class Director {
  /**
   * Creates a mock server group and records the status of players playing
   * in a match.
   *
   * @param {number} servers Number of servers
   */
  constructor(servers) {
    if (typeof servers !== 'number')
      throw new Error('Servers must be a number');

    this.servers = new Array(servers).fill(true);
    this.matches = []; // each element uses an array of 2 arrays of player names, e.g. [[p1, p2, p3],[p4, p5, p6]] => p1 & p2 & p3 vs p4 & p5 & p6
  }

  /**
   * Assigns a match to a server if there are vacant servers.
   *
   * @param {Match} match A Match Object.
   * @returns A true/false boolean for whether match assignment to server
   * was successful.
   */
  startMatch(match) {
    if (typeof match !== 'object') return false;

    const room = this.servers.findIndex((i) => i);
    if (room === -1) return false;

    this.servers[room] = false;
    const teamsOfPlayers = match.getTeamsOfPlayers(this.matchArrayify);
    if (!teamsOfPlayers) return false;

    this.matches.push(teamsOfPlayers);
    match.start();
    return true;
  }

  /**
   * Gets the 2 team of players' names in Director's match Array format.
   *
   * @param {Array} team1 Array of Players objects in the first team
   * @param {Array} team2 Array of Players objects in the second team
   * @returns An Array of 2 team of players' names or a false boolean.
   */
  matchArrayify(team1, team2) {
    if (typeof team1 !== 'object') return false;
    if (typeof team2 !== 'object') return false;

    const team1Players = team1.map((player) => player.getName());
    const team2Players = team2.map((player) => player.getName());

    var result = team1Players.findIndex((player) => !player);
    if (result) return false;
    result = team2Players.findIndex((player) => !player);
    if (result) return false;

    return [team1Players, team2Players];
  }

  /**
   * When match is done, free up server slot.
   *
   * @param {Match} match A Match Object.
   * @returns A true/false boolean for whether match deassignment to server
   * was successful.
   */
  endMatch(match) {
    if (typeof match !== 'object') return false;

    const finished = this.matches.findIndex((room) => {
      const players = room.flat();
      const allNames = players.join('');

      const queryPlayers = match.getTeamsOfPlayers().flat();
      const queryNames = queryPlayers.join('');

      return allNames === queryNames;
    });

    if (finished === -1) return false;

    this.matches.splice(finished, 1);
    const room = this.servers.findIndex((i) => !i);
    this.servers[room] = true;
    return true;
  }

  /**
   * Checks whether player is currently in a match.
   * @param {Player} player A Player object.
   * @returns A true/false boolean.
   */
  isPlaying(player) {
    const players = this.matches.flat(2);
    const result = players.find((name) => name === player);
    return result;
  }
}
