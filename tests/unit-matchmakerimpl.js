import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';
import Bin from '../src/matchmaking/Bin';
import { expect } from '@jest/globals';

describe('A MatchmakerImpl', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new MatchmakerImpl(123)).toThrow();
    expect(() => new MatchmakerImpl([[123]])).toThrow();
  });
});
