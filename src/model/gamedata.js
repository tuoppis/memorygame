export default class GameData {
  constructor(pairs) {
    this.highScores = [];
    this.reset(pairs);
  }

  reset(pairs) {
    this.pairs = pairs;
    this.pairsLeft = pairs;
    this.bounty = pairs;
    this.score = 0;
    this.guesses = 0;
    this.mode = "start";
    this.message = "Start playing by clicking on the cards!";
    this.ratingScale = 10 / (pairs * (pairs - 1));
  }

  getRating() {
    const rating = (this.score - this.pairs) * this.ratingScale;
    return (rating > 0) * rating;
  }

  getHighScore() {
    return this.highScores[this.pairs];
  }

  trySetHighScore() {
    if (this.score <= this.highScores[this.pairs]) return false;
    this.highScores[this.pairs] = this.score;
    return true;
  }
}
