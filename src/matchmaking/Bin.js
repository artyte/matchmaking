import Player from './Player';

/**
 * Foundation used to make queues with ratings range.
 * Also doubles as a stats collector to be shown as the end result of
 * this program.
 */
export default class Bin {
  /**
   * Bin configs:
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
    this.ratingDif = [];
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
   *
   * @param {object} player A Player object
   * @returns Success/failure of adding to queue.
   */
  enqueue(player) {
    if (!(player instanceof Player)) return false;
    if (player.rating >= this.max || player.rating < this.min) return false;
    if (this.q.find((qPlayer) => qPlayer.name === player.name)) return false;

    player.setQueueTime();
    this.q.push(player);
    return true;
  }

  /**
   * Used to remove a player, who stops looking for a match, from the queue.
   *
   * @param {object} player A Player object
   * @returns The player, otherwise a false boolean.
   */
  dequeue(player) {
    if (!(player instanceof Player)) return false;
    if (this.q.length === 0) return false;

    const newArray = this.q.filter((qPlayer) => qPlayer.name !== player.name);
    this.q = newArray;
    player.resetQueueTime(false);
    return player;
  }

  /**
   * Checks if queue has enough players to make a match and returns the
   * necessary amount of players to form a team. Players are removed by
   * order of who queued first.
   *
   * @returns An array of Player objects or a false boolean.
   */
  isFull() {
    if (this.qDepth > this.q.length) return false;

    const players = this.q.slice(0, this.qDepth);
    this.q = this.q.slice(this.qDepth);
    return players;
  }

  /**
   * Checks whether a player's rating is within range of this bin's.
   *
   * @param {number} rating
   * @returns a true/false boolean.
   */
  isInRange(rating) {
    if (typeof rating !== 'number') return false;

    if (this.min > rating) return false;
    if (this.max <= rating) return false;

    return true;
  }
}
