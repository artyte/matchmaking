export default class Match {
  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
  }

  getTeam1() {
    return this.team1;
  }

  getTeam2() {
    return this.team2;
  }

  getTeamsOfPlayers() {
    const team1Players = this.team1.map((player) => player.getName());

    const team2Players = this.team2.map((player) => player.getName());

    return [team1Players, team2Players];
  }

  start() {
    this.team1.forEach((player) => {
      // put it at director
      player.resetQueueTime(true);
    });

    this.team2.forEach((player) => {
      // put it at director
      player.resetQueueTime(true);
    });
  }
}
