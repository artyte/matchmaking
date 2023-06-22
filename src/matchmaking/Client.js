import Player from './Player';
import fs from 'fs';
import MatchmakerImpl from './MatchmakerImpl';
import Director from './Director';
import Bin from './Bin';

/**
 * Since writing a script to manage clients would be complicated, this
 * Client class acts as the client for all Players. The methods can then be
 * called in another script at regular intervals to emulate calling multiple
 * clients to queue for a match.
 *
 * Unlike a real Client class which polls the status of its player in a
 * matchmaking service, this Client directly polls from the Director
 * class the status of a player.
 *
 * This is because this program is trying to emulate a matchmaking system
 * (client/matchmaker/director) without separating the program. Having the
 * Matchmaker wait for the Director to resolve a match assignment would
 * prevent other players from queueing. This would be unrealistic. As such,
 * direct polling to Director will be done at regular intervals.
 */
export default class Client {
  /**
   * Load sample players using a json file. Then create idle/wait/play
   * queues to start client.
   *
   * @param {string} file Path to file containing sample players.
   */
  constructor(file) {
    if (typeof file !== 'string') throw new Error('File path must be a string');

    const raw = fs.readFileSync(file);
    const data = JSON.parse(raw);

    this.idle = data.map(
      ({ name, wins, losses }) => new Player(name, wins, losses),
    );

    this.wait = [];
    this.play = [];
  }

  /**
   * Using any matchmaker implementation, add a player into matchmaking.
   * Adding them would move them from the idle queue to the wait queue.
   *
   * @param {Matchmaker} matchmakerImpl A Matchmaker child object.
   * @returns A true/false boolean for entering matchmaking.
   */
  queue(matchmakerImpl) {
    if (!(matchmakerImpl instanceof MatchmakerImpl)) return false;

    const pIndex = Math.floor(Math.random() * this.idle.length);
    const player = this.idle[pIndex];
    if (!player) return false;

    this.idle.splice(pIndex, 1);
    this.wait.push(player);

    const result = matchmakerImpl.enterMatchmaking(player);
    return result;
  }

  /**
   * Checks players' status and move them into the appropriate queue.
   *
   * @param {Director} director A Director object.
   * @returns A true/false boolean for polling player status.
   */
  poll(director) {
    if (!(director instanceof Director)) return false;

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

    return true;
  }

  /**
   * Prints out stats of the matchmaking service
   * @param {Array} bins An array of bin config values
   * @returns 
   */
  printStats(bins) {
    if (!(bins instanceof Array)) return false;

    const allBins = bins.map(
      ([min, max, playersPerTeam]) => new Bin(min, max, playersPerTeam),
    );
    const allPlayers = [...this.idle, ...this.wait, ...this.play];

    allPlayers.forEach((player) => {
      const bin = allBins.find((bin) => bin.isInRange(player.getRating()));
      player.resetQueueTime(false);

      const qHistory = player.getQueueHistory();
      qHistory.forEach(({ queueDur, tightness, matched }) => {
        bin.addQTimes(queueDur);
        if (matched) bin.addTightness(tightness);
      });
    });

    // eslint-disable-next-line no-console
    console.log('Matchmaking Stats------------------------------------------------------------------------->');
    allBins.forEach((bin) => {
      const queueTimes = bin.getQTimes();
      const avgQtime =
        queueTimes.reduce((a, b) => a + b, 0) / (queueTimes.length * 1000) || 0;
      const printQTime = avgQtime.toFixed(2);

      const tightness = bin.getTightness();
      const matches = tightness.length / bin.getMaxLen() || 0;
      const avgTightness =
        tightness.reduce((a, b) => a + b, 0) / tightness.length || 0;
      const printTightness = avgTightness.toFixed(2);

      const maxRating = bin.getMax();
      const minRating = bin.getMin();

      // eslint-disable-next-line no-console
      console.log(
        `Rating: ${minRating} - ${maxRating}, No. Of Matches: ${matches}, Avg. Wait Time: ${printQTime}s, Avg. MMR Tightness: ${printTightness}`,
      );
    });
  }
}
