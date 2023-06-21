/**
 * Representation of a player.
 */
export default class Player {
  /**
   * Instantiated from json file data.
   *
   * @param {string} name Name of player.
   * @param {number} wins Number of wins.
   * @param {number} losses Number of losses.
   */
  constructor(name, wins = 0, losses = 0) {
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
    this.rating;
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

  /** Used when entering queue */
  setQueueTime() {
    this.queueDate = new Date();
    this.queueTime = this.queueDate.getTime();
  }

  /**
   * Adds new queuing history to allow for subsequent queues.
   *
   * @param {boolean} isMatched Whether player has started a match.
   * @param {number} ratingDif MMR Tightness of a match. -1 means match was
   * was never allocated.
   * @returns
   */
  resetQueueTime(isMatched, ratingDif = -1) {
    if (typeof isMatched !== 'boolean') return false;
    if (!this.queueTime) return false;

    this.qHistory.push({
      queueDate: this.queueDate,
      queueDur: +new Date() - this.queueTime,
      matched: isMatched,
      tightness: ratingDif,
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

  /**
   * Calls a ratings calculator algo provided by Matchmaker to calculate
   * Player's rating.
   *
   * @param {function} calculate A callback function.
   * @returns Ratings or a false boolean if callback fails.
   */
  calRating(calculate) {
    if (typeof calculate !== 'function') return false;

    this.rating = calculate(this.wins, this.losses);
    return true;
  }
}
