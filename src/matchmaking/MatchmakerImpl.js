import Matchmaker from './Matchmaker';
import Match from './Match';

/**
 * The matchmaking implementation that you will write.
 */
export default class MatchmakerImpl extends Matchmaker {
  findMatch(playersPerTeam) {
    // TODO:
    // player wants to match in a certain team format
    // set playersPerTeam for player
    // add player into respective queue
    // matchmaking algo?
  }

  enterMatchmaking(player) {
    // TODO:
    // player gets accepted by matchmaking algo
    // player is added to Match
    // Match's players are all dequeued
  }
}