import Bin from '../src/matchmaking/Bin';
import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';
import Player from '../src/matchmaking/Player';
import { bins } from '../src/config';
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
    bins.shift();
    let player1 = new Player('player', 0, 5000);
    let matchmaker = new MatchmakerImpl(bins);
    let result = matchmaker.enterMatchmaking(player1);
    expect(result).toBe(false);

    // same player
    let bin = new Bin(1000, 2000, 3);
    bin.enqueue(player1);
    result = bin.enqueue(player1);
    expect(result).toBe(false);
    // invalid player type
    player1 = 'asd';
    result = bin.enqueue(player1);
    expect(result).toBe(false);
  });

  it('would not dequeue', () => {
    // invalid player type
    let bin = new Bin(1000, 2000, 2);
    let player1 = new Player('player1', 100, 0);
    bin.enqueue(player1);
    let result = bin.dequeue('asd');
    expect(result).toBe(false);

    // empty bin
    bin = new Bin(1000, 2000, 2);
    result = bin.dequeue(player1);
    expect(result).toBe(false);
  });

  it('should not be full', () => {
    let bin = new Bin(1000, 2000, 2);
    let player1 = new Player('player1', 100, 0);
    bin.enqueue(player1);
    let result = bin.isFull();
    expect(result).toBe(false);
  });

  it('should be full', () => {
    let bin = new Bin(1000, 2000, 1);
    let player1 = new Player('player1', 100, 0);
    let player2 = new Player('player2', 100, 0);
    bin.enqueue(player1);
    bin.enqueue(player2);
    let result = bin.isFull();

    let queue = [];
    queue.push(player1);
    queue.push(player2);
    expect(result).toEqual(queue); //returned match is contains player1 and player2
  });

  it('is not in range of player\'s rating', () => {
    // invalid parameter type
    let bin = new Bin(1000, 2000, 1);
    let result = bin.isInRange('123');
    expect(result).toBe(false);

    // parameter value not in range
    result = bin.isInRange(123);
    expect(result).toBe(false);
    result = bin.isInRange(12223);
    expect(result).toBe(false);
  });

  it('cannot add back a player', () => {
    // invalid parameter type
    let bin = new Bin(1000, 2000, 1);
    let result = bin.gofirst('123');
    expect(result).toBe(false);

    // player not in range
    bin = new Bin(1900, 2000, 1);
    let player1 = new Player('player1', 0, 100);
    player1.rating = 1000;
    result = bin.gofirst(player1);
    expect(result).toBe(false);

    // player added twice
    bin = new Bin(1000, 2000, 1);
    player1 = new Player('player1', 0, 100);
    player1.rating = 1000;
    bin.gofirst(player1);
    result = bin.gofirst(player1);
    expect(result).toBe(false);
  });

  it('cannot add tightness', () => {
    // invalid parameter type
    let bin = new Bin(1000, 2000, 1);
    let result = bin.addTightness('123');
    expect(result).toBe(false);
  });

  it('cannot add queue times', () => {
    // invalid parameter type
    let bin = new Bin(1000, 2000, 1);
    let result = bin.addQTimes('123');
    expect(result).toBe(false);
  });
});
