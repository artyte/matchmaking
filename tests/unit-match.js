import Match from '../src/matchmaking/Match';
// var Match = require('../src/matchmaking/Match');

describe('Match', () => {
  it('should give team1', () => {
    const match = new Match('abc', '123');
    expect(match.getTeam1()).toBe('abc');
  });
});
