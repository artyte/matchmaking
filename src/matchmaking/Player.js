/**
 * Representation of a player.
 * 
 * As indicated in the challenge description, feel free to augment the Player class in any way that you feel will improve your final matchmaking solution.
 * 
 * Do NOT remove the name, wins, or losses fields.
 * 
 * Also note that if you make any of these changes, you are responsible for updating the sample-data.json such that it provides a useful data set to exercise your solution.
 */
export default class Player {
  constructor(name, wins, losses) {
    this.name = name;
    this.wins = wins;
    this.losses = losses;
  }

  getName() {
    return this.name;
  }

  getWins() {
    return this.wins;
  }

  getLosses() {
    return this.losses;
  }
}