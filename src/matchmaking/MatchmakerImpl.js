import Matchmaker from './Matchmaker';
import Bin from './Bin';
import Match from './Match';
import Player from './Player';

/**
 * This matchmaker service implements a variant of elo to caluclate the
 * rating of a player.
 */
export default class MatchmakerImpl extends Matchmaker {
  /**
   * Instantiate matchmaker with elo-ranged bins.
   *
   * @param {Array} bins Array of array of bin configs
   */
  constructor(bins) {
    super();
    if (!(bins instanceof Array)) throw new Error('bins must be an array');
    this.bins = bins.map(
      ([min, max, playersPerTeam]) => new Bin(min, max, playersPerTeam),
    );
  }

  /**
   * Finds 2 teams of players who can be matched and return them as an
   * unplayed match.
   *
   * @param {number} playersPerTeam
   * @returns 2 matched teams or false boolean
   */
  findMatch(playersPerTeam) {
    if (typeof playersPerTeam !== 'number') return false;
    if (this.bins[0].getFormat() !== playersPerTeam) return false;

    let match;
    this.bins.some((bin) => {
      const players = bin.isFull();
      if (!players) return false;

      const team1 = players.slice(0, players.length / 2);
      const team2 = players.slice(players.length / 2);
      match = new Match(team1, team2);
      return true;
    });

    if (!match) return false;
    return match;
  }

  /**
   * elo-type ratings calculator
   *
   * @param {number} losses
   * @param {number} wins
   * @returns player's rating
   */
  mmr(wins, losses) {
    if (typeof wins !== 'number') return false;
    if (typeof losses !== 'number') return false;

    const k = 1000;
    const expectedWins = wins / (wins + losses);
    const rating = expectedWins ? 1500 + k * (expectedWins - 0.5) : 1500;
    return rating;
  }

  /**
   * Adds a player, who is ready to wait for a match, into the matchmaking
   * queue.
   *
   * @param {Player} player A Player object.
   * @returns boolean true/false for whether the player was added into the
   * queue.
   */
  enterMatchmaking(player) {
    if (!(player instanceof Player)) return false;
    if (!player.calRating(this.mmr)) return false;

    const q = this.bins.find((bin) => bin.isInRange(player.getRating()));
    if (!q) return false;

    const result = q.enqueue(player);
    return result;
  }

  /**
   * Adds a player, who was failed to be assigned to a server, back into the
   * matchmaking queue.
   *
   * @param {Player} player A Player object.
   * @returns boolean true/false for whether the player was added into the
   * queue.
   */
  backToMatchmaking(player) {
    if (!(player instanceof Player)) return false;
    if (!player.calRating(this.mmr)) return false;

    const q = this.bins.find((bin) => bin.isInRange(player.getRating()));
    const result = q.gofirst(player);
    return result;
  }
}
