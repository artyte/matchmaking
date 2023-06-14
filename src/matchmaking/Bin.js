/**
 *
 */
export default class Bin {
  /**
   *
   * @param {number} min Inclusive minimum rating of rating range.
   * @param {number} max Exclusive maximum rating of rating range.
   * @param {number} len Format of match used for bin.
   */
  constructor(min, max, len) {
    if (
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      typeof len !== 'number'
    )
      throw new Error('Bin parameters must be numbers');

    this.min = min;
    this.max = max;
    this.format = len;
    this.qDepth = len * 2;
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

  /**
   * 
   * @returns 
   */
  isFull() {
    if (this.qDepth !== this.q.length) return false;

    const players = this.q;
    this.q = [];
    players.forEach((player) => {
      player.resetQueueTime();
    });
    return players;
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
   * @returns {boolean} Add to queue success/failure
   */
  enqueue(player) {
    if (typeof player !== 'object') return false;

    if (this.qDepth === this.q.length) return false;

    if (player.rating >= this.max || player.rating < this.min) return false;

    if (this.q.find((qPlayer) => qPlayer.name === player.name)) return false;

    player.setQueueTime();
    this.q.push(player);
    return true;
  }

  /**
   * Used to remove a player, who stops looking for a match, from the queue.
   * @param {object} player A Player object
   * @returns {boolean} Remove from queue success/failure
   */
  dequeue(player) {
    if (typeof player !== 'object') return false;

    if (this.q.length === 0) return false;

    const newArray = this.q.filter((qPlayer) => qPlayer.name !== player.name);
    this.q = newArray;
    return true;
  }
}
