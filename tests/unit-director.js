import Director from '../src/matchmaking/Director';
import MatchmakerImpl from '../src/matchmaking/MatchmakerImpl';
import Player from '../src/matchmaking/Player';
import { expect } from '@jest/globals';

describe('A Director', () => {
  it('should not initialize', () => {
    // invalid parameter type
    expect(() => new Director('123')).toThrow();

    // invalid parameter value
    expect(() => new Director(-1)).toThrow();
    expect(() => new Director(0)).toThrow();
  });

  it('should not start match', () => {
    // invalid parameter type
    let director = new Director(1);
    let result = director.startMatch(123);
    expect(result).toBe(false);

    // no rooms for matchmaking
    director = new Director(1);
    let matchmaker = new MatchmakerImpl([[1000, 1300, 3]]);
    let player1 = new Player('player1', 0, 100);
    let player2 = new Player('player2', 0, 100);
    let player3 = new Player('player3', 0, 100);
    let player4 = new Player('player4', 0, 100);
    let player5 = new Player('player5', 0, 100);
    let player6 = new Player('player6', 0, 100);
    let player11 = new Player('player11', 0, 100);
    let player21 = new Player('player21', 0, 100);
    let player31 = new Player('player31', 0, 100);
    let player41 = new Player('player41', 0, 100);
    let player51 = new Player('player51', 0, 100);
    let player61 = new Player('player61', 0, 100);
    matchmaker.enterMatchmaking(player1);
    matchmaker.enterMatchmaking(player2);
    matchmaker.enterMatchmaking(player3);
    matchmaker.enterMatchmaking(player4);
    matchmaker.enterMatchmaking(player5);
    matchmaker.enterMatchmaking(player6);
    matchmaker.enterMatchmaking(player11);
    matchmaker.enterMatchmaking(player21);
    matchmaker.enterMatchmaking(player31);
    matchmaker.enterMatchmaking(player41);
    matchmaker.enterMatchmaking(player51);
    matchmaker.enterMatchmaking(player61);
    let match = matchmaker.findMatch(3);
    result = director.startMatch(match);
    expect(result).toBe(true);
    match = matchmaker.findMatch(3);
    result = director.startMatch(match);
    expect(result).toBe(false);
  });

  it('should not end match', () => {
    // invalid parameter type
    let director = new Director(1);
    let result = director.endMatch(123);
    expect(result).toBe(false);

    // no rooms for matchmaking
    director = new Director(1);
    let matchmaker = new MatchmakerImpl([[1000, 1300, 3]]);
    let player1 = new Player('player1', 0, 100);
    let player2 = new Player('player2', 0, 100);
    let player3 = new Player('player3', 0, 100);
    let player4 = new Player('player4', 0, 100);
    let player5 = new Player('player5', 0, 100);
    let player6 = new Player('player6', 0, 100);
    matchmaker.enterMatchmaking(player1);
    matchmaker.enterMatchmaking(player2);
    matchmaker.enterMatchmaking(player3);
    matchmaker.enterMatchmaking(player4);
    matchmaker.enterMatchmaking(player5);
    matchmaker.enterMatchmaking(player6);
    let match = matchmaker.findMatch(3);
    director.startMatch(match);
    result = director.endMatch(match);
    expect(result).toBe(true);
    result = director.endMatch(match);
    expect(result).toBe(false);
  });

  it('should not make arrays', () => {
    // invalid parameter type
    let director = new Director(1);
    let player1 = new Player('player1', 0, 100);
    let player2 = new Player('player2', 0, 100);
    let player3 = new Player('player3', 0, 100);
    let player4 = new Player('player4', 0, 100);
    let team1 = [player1, player2];
    let team2 = [player3, player4];
    let result = director.matchArrayify(1, team2);
    expect(result).toBe(false);
    result = director.matchArrayify([1], team2);
    expect(result).toBe(false);
    result = director.matchArrayify(team1, 2);
    expect(result).toBe(false);
    result = director.matchArrayify(team1, [2]);
    expect(result).toBe(false);

    // no rooms for matchmaking
    director = new Director(1);
    player1 = new Player('player1', 0, 100);
    player2 = new Player('', 0, 100);
    player3 = new Player('player3', 0, 100);
    player4 = new Player('player4', 0, 100);
    team1 = [player1, player2];
    team2 = [player3, player4];
    result = director.matchArrayify(team1, team2);
    expect(result).toBe(false);
    player1 = new Player('player1', 0, 100);
    player2 = new Player('player2', 0, 100);
    player3 = new Player('player3', 0, 100);
    player4 = new Player('', 0, 100);
    team1 = [player1, player2];
    team2 = [player3, player4];
    result = director.matchArrayify(team1, team2);
    expect(result).toBe(false);
  });

  it('should not veryify player', () => {
    // invalid parameter type
    let director = new Director(1);
    let result = director.isPlaying(123);
    expect(result).toBe(false);
  });
});
