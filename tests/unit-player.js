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

  it('should not queue', () => {
    let player1 = new Player('player1', 0, 100);
    bins.shift();
    const matchmaker = new MatchmakerImpl(bins);
    const result = matchmaker.enterMatchmaking(player1);
    expect(result).toBe(false);
  });

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
