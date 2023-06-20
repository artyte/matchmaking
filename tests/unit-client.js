import Client from '../src/matchmaking/Client';
import { expect } from '@jest/globals';

describe('A Client', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new Client(123)).toThrow();

    // invalid parameter value
    expect(() => new Client('dfgdfgfd')).toThrow();
  });
});
