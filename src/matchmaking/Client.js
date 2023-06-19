import Player from './Player';
import fs from 'fs';

export default class Client {
  constructor(file) {
    const raw = fs.readFileSync(file);
    const data = JSON.parse(raw);

    this.idle = data.map(
      (name, wins, losses) => new Player(name, wins, losses),
    );

    this.wait = [];
    this.play = [];
  }

  queue(matchmakerImpl) {
    const pIndex = Math.floor(Math.random() * this.idle.length);
    const player = this.idle[pIndex];
    this.idle.splice(pIndex, 1);
    this.wait.push(player);

    const result = matchmakerImpl.enterMatchmaking(player);
    return result;
  }

  /** Checks players playing status and move them into the appropriate queue */
  poll(director) {
    // move players who finished playing to idle queue
    this.play
      .map((player) => {
        const result = director.isPlaying(player);
        if (result) return player;

        this.idle.push(player);
        return false;
      })
      .filter((player) => player);

    // move players who started playing to play queue
    this.wait
      .map((player) => {
        const result = director.isPlaying(player);
        if (!result) return player;

        this.play.push(player);
        return false;
      })
      .filter((player) => player);
  }
}
