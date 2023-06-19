/**
 *
 */
export default class Bin {
  /**
   *
   * @param {number} min Inclusive minimum rating of rating range.
   * @param {number} max Exclusive maximum rating of rating range.
   * @param {number} playersPerTeam Format of match used for bin.
   */
  constructor(min, max, playersPerTeam) {
    if (
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      typeof playersPerTeam !== 'number'
    )
      throw new Error('Bin parameters are invalid');

    if (playersPerTeam <= 0)
      throw new Error('Length of queue cannot be 0 or negative');
    if (max < min)
      throw new Error('Max range cannot be smaller than min range');

    this.min = min;
    this.max = max;
    this.format = playersPerTeam;
    this.qDepth = playersPerTeam * 2;
    this.q = [];
  }

  getMin() {
    return this.name;
  }

  getMax() {
    return this.wins;
  }

  getMaxLen() {
    return this.qDepth;
  }

  getCurLen() {
    return this.q.length;
  }

  getFormat() {
    return this.format;
  }

  getConfig() {
    return {
      min: this.min,
      max: this.max,
      maxLen: this.qDepth,
      curLen: this.q.length,
      len: this.format,
    };
  }

  getBin() {
    return this.q;
  }

  /**
   * Used to add a player, who starts looking for a match, to the queue.
   * @param {object} player A Player object
   * @returns Success/failure of adding to queue.
   */
  enqueue(player) {
    if (typeof player !== 'object') return false;
    // if (this.qDepth === this.q.length) return false;
    if (player.rating >= this.max || player.rating < this.min) return false;
    if (this.q.find((qPlayer) => qPlayer.name === player.name)) return false;

    player.setQueueTime();
    this.q.push(player);
    return true;
  }

  /**
   * Used to remove a player, who stops looking for a match, from the queue.
   * @param {object} player A Player object
   * @returns The player, otherwise a false.
   */
  dequeue(player) {
    if (typeof player !== 'object') return false;
    if (this.q.length === 0) return false;

    const newArray = this.q.filter((qPlayer) => qPlayer.name !== player.name);
    this.q = newArray;
    player.resetQueueTime(false);
    return player;
  }

  /**
   * Bin is ready to enter match. Return all players in the bin.
   * If full, empty the bin and return its players.
   * If not full, return false.
   * @returns
   */
  isFull() {
    if (this.qDepth > this.q.length) return false;

    const players = this.q.slice(0, this.qDepth);
    players.forEach((player) => {
      player.resetQueueTime(true);
    });

    this.q = this.q.slice(this.qDepth);
    return players;
  }

  isInRange(rating) {
    if (typeof rating !== 'number') return false;

    if (this.min > rating) return false;
    if (this.max <= rating) return false;

    return true;
  }
}
