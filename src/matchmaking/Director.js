export default class Director {
  constructor(servers) {
    this.servers = new Array(servers).fill(true);
    this.matches = [];
  }

  startMatch(match) {
    if (typeof match !== 'object') return false;
    // if (!match.getId()) return false;

    const room = this.servers.findIndex((i) => i);
    if (room === -1) return false;

    this.servers[room] = false;
    this.matches.push(match.getTeamsOfPlayers());
    match.start();
    return true;
  }

  endMatch(match) {
    if (typeof match !== 'object') return false;
    // if (!match.getId()) return false;

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

  isPlaying(player) {
    const players = this.matches.flat(2);
    const result = players.find((name) => name === player);
    return result;
  }
}
