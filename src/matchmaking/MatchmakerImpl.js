import Matchmaker from './Matchmaker';
import Bin from './Bin';

/**
 * The matchmaking implementation that you will write.
 */
export default class MatchmakerImpl extends Matchmaker {
  constructor(bins) {
    super();
    this.bins = bins.map(
      (min, max, playersPerTeam) => new Bin(min, max, playersPerTeam),
    );
  }

  findMatch(playersPerTeam) {
    if (typeof playersPerTeam !== 'number') return false;
    if (this.bins[0].getFormat() !== playersPerTeam) return false;

    // TODO:
    // player wants to match in a certain team format
    // set playersPerTeam for player
    // add player into respective queue
    // matchmaking algo?
  }

  enterMatchmaking(player) {
    if (typeof player !== 'object') return false;
    if (!player.getRating()) return false;

    const q = this.bins.find((bin) => bin.isInRange(player.getRating()));
    const result = q.enqueue(player);
    return result;
  }
}
