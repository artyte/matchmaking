/**
 * Representation of a player.
 *
 * As indicated in the challenge description, feel free to augment the Player class in any way that you feel will improve your final matchmaking solution.
 *
 * Do NOT remove the name, wins, or losses fields.
 *
 * Also note that if you make any of these changes, you are responsible for updating the sample-data.json such that it provides a useful data set to exercise your solution.
 */
export default class Player {
  /**
   *
   * @param {string} name Name of player.
   * @param {number} wins Number of wins.
   * @param {number} losses Number of losses.
   */
  constructor(name, wins, losses) {
    if (
      typeof name !== 'string' ||
      typeof wins !== 'number' ||
      typeof losses !== 'number'
    )
      throw new Error('Player parameters are invalid');

    if (wins < 0) throw new Error('Wins cannot be negative');
    if (losses < 0) throw new Error('Losses cannot be negative');

    this.name = name;
    this.wins = wins;
    this.losses = losses;
    this.queueTime;
    this.queueDate;
    this.qHistory = [];
    this.rating = 0;
    this.calRating();
  }

  getName() {
    return this.name;
  }

  getWins() {
    return this.wins;
  }

  getLosses() {
    return this.losses;
  }

  getQueueTime() {
    return this.queueTime;
  }

  getQueueDate() {
    return this.getQueueDate;
  }

  upWins() {
    this.wins++;
  }

  upLosses() {
    this.losses++;
  }

  setQueueTime() {
    this.queueDate = new Date();
    this.queueTime = this.queueDate.getTime();
  }

  /** adds new queuing history and resets initial queue date and time */
  resetQueueTime(isMatched) {
    if (typeof isMatched !== 'boolean') return false;
    if (!this.queueTime) return false;

    this.qHistory.push({
      queueDate: this.queueDate,
      queueDur: +new Date() - this.queueTime,
      matched: isMatched,
    });

    this.queueDate = undefined;
    this.queueTime = undefined;
  }

  getQueueHistory() {
    return this.qHistory;
  }

  getRating() {
    return this.rating;
  }

  calRating() {
    const rating = this.wins + 100 - this.losses;
    this.rating = rating;
  }
}
