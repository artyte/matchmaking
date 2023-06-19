import Matchmaker from './Matchmaker';
import Bin from './Bin';
import Match from './Match';

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

    var match;
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

  mmr(wins, losses) {
    const k = 32;
    const expectedWins = wins / (wins + losses);
    const rating = 1500 + k * (expectedWins - 0.5);
    return rating;
  }

  enterMatchmaking(player) {
    if (typeof player !== 'object') return false;
    if (!player.calrating(this.mmr)) return false;

    const q = this.bins.find((bin) => bin.isInRange(player.getRating()));
    const result = q.enqueue(player);
    return result;
  }
}
