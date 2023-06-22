import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';
import { bins } from '../src/config';
import { expect } from '@jest/globals';
import Player from '../src/matchmaking/Player';

describe('A MatchmakerImpl', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new MatchmakerImpl(123)).toThrow();
    expect(() => new MatchmakerImpl([123])).toThrow();
  });

  it('should not find match', () => {
    // invalid parameter type
    let matchmaker = new MatchmakerImpl(bins);
    let result = matchmaker.findMatch('sdf');
    expect(result).toBe(false);

    // invalid parameter value
    result = matchmaker.findMatch(4);
    expect(result).toBe(false);

    // not enough players
    result = matchmaker.findMatch(3);
    expect(result).toBe(false);
  });

  it('should not calculate mmr', () => {
    // invalid parameter type
    let matchmaker = new MatchmakerImpl(bins);
    let result = matchmaker.mmr('asd', 123);
    expect(result).toBe(false);
    result = matchmaker.mmr(123, 'asd');
    expect(result).toBe(false);
  });

  it('should not enter matchmaking', () => {
    // invalid parameter type
    let matchmaker = new MatchmakerImpl([[1300, 1500, 3]]);
    let result = matchmaker.enterMatchmaking(123);
    expect(result).toBe(false);
    let player = new Player('player', 0, 1000);
    result = matchmaker.enterMatchmaking(player);
    expect(result).toBe(false);
  });

  it('should not go back to matchmaking', () => {
    // invalid parameter type
    let matchmaker = new MatchmakerImpl([[1300, 1500, 3]]);
    let result = matchmaker.backToMatchmaking(123);
    expect(result).toBe(false);
    let player = new Player('player', 0, 1000);
    result = matchmaker.backToMatchmaking(player);
    expect(result).toBe(false);
  });
});
