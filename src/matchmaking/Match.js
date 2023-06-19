export default class Match {
  constructor(team1, team2, id) {
    this.id = id;
    this.team1 = team1;
    this.team2 = team2;
  }

  getTeam1() {
    return this.team1;
  }

  getTeam2() {
    return this.team2;
  }
}