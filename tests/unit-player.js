import Player from '../src/matchmaking/Player';
import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';
import { bins } from '../src/config';
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

  // it('would get accurate wins', () => {
  //   let prevWins = 100;
  //   let player = new Player('player1', prevWins, 500);
  //   player.upWins();
  //   let curWins = player.getWins();
  //   expect(curWins).toBe(prevWins+1);
  // });

  // it('would get accurate losses', () => {
  //   let prevLosses = 500;
  //   let player = new Player('player1', 100, prevLosses);
  //   player.upLosses();
  //   let curLosses = player.getLosses();
  //   expect(curLosses).toBe(prevLosses + 1);
  // });

  it('should record queue times', async () => {
    let player1 = new Player('player1', 100, 0);
    const matchmaker = new MatchmakerImpl(bins);
    matchmaker.enterMatchmaking(player1);

    const advanceTime = 10000;
    jest.advanceTimersByTime(advanceTime);

    // Simulate programming needing to stop, abruptly ending queuetimes
    player1.resetQueueTime(false);
    const qHistory = player1.getQueueHistory();
    const queue1 = qHistory.pop();

    expect(queue1).toEqual(
      expect.objectContaining({
        queueDate: expect.any(Object),
        queueDur: expect.any(Number),
        matched: false,
        tightness: -1,
      }),
    );
    expect(queue1.queueDur >= advanceTime);
  });

  it('should not reset queue times', async () => {
    // invalid isMatched type
    let player1 = new Player('player1', 100, 0);
    player1.setQueueTime();
    let result = player1.resetQueueTime('asd');
    expect(result).toBe(false);
    result = true;

    // no initial queue time
    player1 = new Player('player1', 100, 0);
    result = player1.resetQueueTime(true);
    expect(result).toBe(false);
    result = true;
  });
});
