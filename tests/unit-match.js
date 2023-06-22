import Match from '../src/matchmaking/Match';
import Player from '../src/matchmaking/Player';
import { expect } from '@jest/globals';

describe('A Match', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new Match('asd', [[1]])).toThrow();
    expect(() => new Match([[1]], 'asd')).toThrow();
    let player1 = new Player('player1', 0, 100);
    let player2 = new Player('player2', 0, 100);
    let team1 = [player1, player2];
    expect(() => new Match(team1, [[1]])).toThrow();
  });

  it('should not get team of players', () => {
    // invalid parameter type
    let player1 = new Player('player1', 0, 100);
    let player2 = new Player('player2', 0, 100);
    let player3 = new Player('player3', 0, 100);
    let player4 = new Player('player4', 0, 100);
    let team1 = [player1, player2];
    let team2 = [player3, player4];
    let match = new Match(team1, team2);
    let result = match.getTeamsOfPlayers(123);
    expect(result).toBe(false);
  });
});
