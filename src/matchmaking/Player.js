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