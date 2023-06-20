import Director from '../src/matchmaking/Director';
import { expect } from '@jest/globals';

describe('A Director', () => {
  it('should not initialize', () => {
    expect(() => new Director('123')).toThrow();
    expect(() => new Director(-1)).toThrow();
    expect(() => new Director(0)).toThrow();
  });
});
