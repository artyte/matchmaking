export default class Director {
  constructor(servers) {
    this.servers = new Array(servers).fill(0);
  }

  startMatch(match) {
    if (typeof match !== 'object') return false;
    if (!('id' in match)) return false;

    const roomsLeft = this.servers.filter((i) => i === 0).length;
    if (roomsLeft === 0) return false;

    const room = this.servers.findIndex((i) => i === 0);
    this.servers[room] = match.id;
    return true;
  }

  endMatch(match) {
    if (typeof match !== 'object') return false;
    if (!('id' in match)) return false;

    const room = this.servers.findIndex((i) => i === match.id);
    if (room === -1) return false;

    this.servers[room] = 0;
    return true;
  }
}
