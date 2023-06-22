import Client from '../src/matchmaking/Client';
import { bins, filePath } from '../src/config';
import { expect } from '@jest/globals';
import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';

describe('A Client', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new Client(123)).toThrow();

    // invalid parameter value
    expect(() => new Client('dfgdfgfd')).toThrow();
  });

  it('should not queue', () => {
    // invalid parameter type
    let client = new Client(filePath);
    let result = client.queue(123);
    expect(result).toBe(false);

    // no players left to queue
    client = new Client(filePath);
    let matchmakerImpl = new MatchmakerImpl(bins);
    let qClients = new Array(201).fill(true);
    qClients.forEach(() => (result = client.queue(matchmakerImpl)));
    expect(result).toBe(false);
  });

  it('should not poll', () => {
    // invalid parameter type
    let client = new Client(filePath);
    let result = client.poll(123);
    expect(result).toBe(false);
  });

  it('should not print stats', () => {
    // invalid parameter type
    let client = new Client(filePath);
    let result = client.printStats(123);
    expect(result).toBe(false);
  });
});
