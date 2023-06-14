import Player from '../src/matchmaking/Player';
import Bin from '../src/matchmaking/Bin';
import { expect, jest } from '@jest/globals';

jest.useFakeTimers();
describe('A player', () => {
  it('should not initialize', () => {
    // invalid parameter types
    expect(() => new Player(123, 100, 500)).toThrow();
    expect(() => new Player('player', 'asd', 500)).toThrow();
    expect(() => new Player('player', 100, 'asd')).toThrow();

    // invalid parameter values
    expect(() => new Player('player', -100, 500)).toThrow();
    expect(() => new Player('player', 100, -500)).toThrow();
  });

  it('would get accurate wins', () => {
    var prevWins = 100;
    var player = new Player('player1', prevWins, 500);
    player.upWins();
    var curWins = player.getWins();
    expect(curWins).toBe(prevWins+1);
  });

  it('would get accurate losses', () => {
    var prevLosses = 500;
    var player = new Player('player1', 100, prevLosses);
    player.upLosses();
    var curLosses = player.getLosses();
    expect(curLosses).toBe(prevLosses + 1);
  });

  it('should record queue times', async () => {
    var bin = new Bin(0, 1000, 1);
    var player1 = new Player('player1', 100, 0);
    bin.enqueue(player1);

    var advanceTime = 1000;
    jest.advanceTimersByTime(advanceTime);

    bin.dequeue(player1);
    var qHistory = player1.getQueueHistory();
    var queue1 = qHistory.pop();

    expect(queue1).toEqual(
      expect.objectContaining({
        queueDate: expect.any(Object),
        queueDur: expect.any(Number),
        matched: false,
      }),
    );
    expect(queue1.queueDur > advanceTime);
  });

  it('should not reset queue times', async () => {
    // invalid isMatched type
    var player1 = new Player('player1', 100, 0);
    player1.setQueueTime();
    var result = player1.resetQueueTime('asd');
    expect(result).toBe(false);
    result = true;

    // no initial queue time
    player1 = new Player('player1', 100, 0);
    result = player1.resetQueueTime(true);
    expect(result).toBe(false);
    result = true;
  });
});
