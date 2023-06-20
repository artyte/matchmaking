/**
 * Contains Player objects in 2 arrays, team1 and team2.
 */
export default class Match {
  /**
   * Instantiate an unplayed match of 2 teams of players.
   *
   * @param {Array} team1 Array of Players objects in the first team
   * @param {Array} team2 Array of Players objects in the second team
   */
  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
  }

  getTeam1() {
    return this.team1;
  }

  getTeam2() {
    return this.team2;
  }

  /**
   * Formats team1 and team2 info according to Director's style.
   *
   * @param {function} format A callback function.
   * @returns Formatted info or a false boolean if callback fails.
   */
  getTeamsOfPlayers(format) {
    if (typeof format !== 'function') return false;

    const result = format(this.team1, this.team2);
    return result;
  }

  /**
   * Start a match by resetting queue time from all players in this match.
   */
  start() {
    this.team1.forEach((player) => {
      // put it at director
      player.resetQueueTime(true);
    });

    this.team2.forEach((player) => {
      // put it at director
      player.resetQueueTime(true);
    });
  }
}
