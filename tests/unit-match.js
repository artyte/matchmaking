import Match from '../src/matchmaking/Match';
import Player from '../src/matchmaking/Player';
import { expect } from '@jest/globals';

describe('A Match', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new Match('asd', 'asd')).toThrow();
    expect(() => new Match([[1]], [[1]])).toThrow();
  });
});
