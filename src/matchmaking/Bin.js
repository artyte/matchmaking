/**
 *
 */
export default class Bin {
  /**
   *
   * @param {number} min Inclusive minimum value range of a bin.
   * @param {number} max Exclusive maximum value range of a bin.
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

  /** returns the whole queue if full */
  isFull() {
    if (this.qDepth !== this.q.length) return false;

    const players = this.q;
    this.q = [];
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

  enqueue(player) {
    if (typeof player !== 'object') return false;

    if (this.qDepth === this.q.length) return false;

    if (player.rating >= this.max || player.rating < this.min) return false;

    this.q.push(player);
    return true;
  }

  /** method may not be necessary */
  dequeue() {
    this.q.shift();
  }
}
