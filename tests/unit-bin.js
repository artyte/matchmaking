import Bin from '../src/matchmaking/Bin';
import Player from '../src/matchmaking/Player';
import { expect } from '@jest/globals';

describe('A bin', () => {
  it('should not initialize', () => {
    // invalid parameter types
    expect(() => new Bin(0, 100, 'sdf')).toThrow();
    expect(() => new Bin(0, 'sdf', 3)).toThrow();
    expect(() => new Bin('sdf', 100, 3)).toThrow();

    // invalid parameter values
    expect(() => new Bin(0, 100, 0)).toThrow();
    expect(() => new Bin(0, 100, -3)).toThrow();
    expect(() => new Bin(100, 0, -3)).toThrow();
  });

  it('would not enqueue', () => {
    // player ratings too low
    var bin = new Bin(50, 100, 3);
    var player1 = new Player('player', 100, 500);
    var result = bin.enqueue(player1);
    expect(result).toBe(false);
    result = true;

    // too many players
    bin = new Bin(0, 1000, 1);
    player1 = new Player('player1', 100, 0);
    var player2 = new Player('player2', 100, 0);
    var player3 = new Player('player3', 100, 0);
    bin.enqueue(player1);
    bin.enqueue(player2);
    result = bin.enqueue(player3);
    expect(result).toBe(false);
    result = true;

    // same player
    bin = new Bin(0, 1000, 3);
    bin.enqueue(player1);
    result = bin.enqueue(player1);
    expect(result).toBe(false);
    result = true;

    // invalid player type
    player1 = 'asd';
    result = bin.enqueue(player1);
    expect(result).toBe(false);
    result = true;
  });

  it('would not dequeue', () => {
    // invalid player type
    var bin = new Bin(0, 1000, 2);
    var player1 = new Player('player1', 100, 0);
    bin.enqueue(player1);
    var result = bin.dequeue('asd');
    expect(result).toBe(false);
    result = true;

    // empty bin
    bin = new Bin(0, 1000, 2);
    result = bin.dequeue(player1);
    expect(result).toBe(false);
    result = true;
  });

  it('should not be full', () => {
    var bin = new Bin(0, 1000, 2);
    var player1 = new Player('player1', 100, 0);
    bin.enqueue(player1);
    var result = bin.isFull();
    expect(result).toBe(false);
    result = true;
  });

  it('should be full', () => {
    var bin = new Bin(0, 1000, 1);
    var player1 = new Player('player1', 100, 0);
    var player2 = new Player('player2', 100, 0);
    bin.enqueue(player1);
    bin.enqueue(player2);
    var result = bin.isFull();

    var queue = [];
    queue.push(player1);
    queue.push(player2);
    expect(result).toEqual(queue);
    result = true;
  });
});
