export class CardInfo {
  #index;
  #symbol;
  #turn;
  #hide;
  #select;
  constructor(index, symbol, turn, hide, select) {
    this.#index = index;
    this.#symbol = symbol;
    this.#turn = turn;
    this.#hide = hide;
    this.#select = select;
  }

  get index() {
    return this.#index;
  }
  get symbol() {
    return this.#symbol;
  }

  select() {
    this.#select(true);
  }
  unSelect() {
    this.#select(false);
    this.#turn(false);
  }

  faceUp() {
    this.#turn(true);
  }

  faceDown() {
    this.#turn(false);
  }

  hide() {
    this.#hide(true);
  }

  show() {
    this.#hide(false);
  }

  reset() {
    this.#turn(false);
    this.#select(false);
    this.#hide(false);
  }
}

export default class GameState {
  #guesses;
  #pairs;
  #pairsLeft;
  #score;
  #bounty;
  #highScores;
  #mode;
  #selected;
  #clickedCards;
  #ratingScale;

  constructor(pairs) {
    this.#selected = [];
    this.#clickedCards = [];
    this.#highScores = [];
    this.reset(pairs);
  }

  #bountyLimit(bounty) {
    return Math.min(this.#pairsLeft, Math.max(1, bounty));
  }
  #select(...cards) {
    cards.forEach((card) => card.select());
    this.#selected.push(cards);
  }
  #clearSelect() {
    this.#selected.forEach((card) => card.unSelect());
    this.#selected = [];
  }

  #match() {
    this.#guesses++;
    this.#selected.forEach((card) => card.faceUp());
    if (this.#selected[0].symbol === this.#selected[1].symbol) {
      this.#selected.forEach((card) => card.hide());
      this.#score += this.#bounty;
      this.#bounty = this.#bountyLimit(this.#bounty + 2);
      if (--this.#pairsLeft === 0) {
        this.#mode = "ended";
        if (this.#highScores[this.#pairs] < this.#score) {
          this.#highScores[this.#pairs] = this.#score;
          this.message = "New Highscore, Congratulations!";
        } else {
          this.message = "You won the game";
        }
      } else {
        this.message = "You found a pair!";
      }
    } else {
      this.#bounty = this.#bountyLimit(this.#bounty - 1);
      this.message = "No luck, try again!";
    }
  }

  reset(pairs) {
    this.#pairs = pairs;
    this.#bounty = pairs;
    this.#pairsLeft = pairs;
    this.#score = 0;
    this.#guesses = 0;
    this.#ratingScale = 10 / (pairs * (pairs - 1));
    this.#mode = "start";
    this.message = "Start playing by clicking on any card!";
  }

  get pairs() {
    return this.#pairs;
  }
  get pairsLeft() {
    return this.#pairsLeft;
  }
  get score() {
    return this.#score;
  }
  get bounty() {
    return this.#bounty;
  }
  get guesses() {
    return this.#guesses;
  }
  get rating() {
    const rating = (this.#score - this.#pairs) * this.#ratingScale;
    return (rating > 0) * rating;
  }

  click(cardInfo) {
    switch (this.#selected.length) {
      case 0:
        this.#select(cardInfo);
        return;
      case 1:
        if (this.#selected[0].index === cardInfo.index) {
          this.#clearSelect();
        } else {
          this.#select(cardInfo);
          this.#match();
        }
        return;
      default:
        if (this.#selected[0].index !== cardInfo.index && this.#selected[1].index !== cardInfo.index) {
          this.#clearSelect();
          this.#select(cardInfo);
        } else {
          this.#clearSelect();
        }
    }
  }
}
