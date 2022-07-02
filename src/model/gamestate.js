import GameEventHandler from "./gameeventhandler.js";
import GameData from "./gamedata.js";

export default class GameState extends GameEventHandler {
  #data;
  #selected;
  #clickedCards;
  #symbols;

  constructor(pairs) {
    super();
    this.#data = new GameData(10);
    this.#selected = [];
    this.#clickedCards = [];
    this.#symbols = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    this.reset(pairs);
  }

  #setValue(prop, value) {
    const old = this.#data[prop];
    if (old !== value) {
      this.#data[prop] = value;
      this.event(prop, value);
    }
  }

  #bountyLimit(bounty) {
    return Math.min(this.#data.pairsLeft, Math.max(1, bounty));
  }
  #select(card) {
    card.select();
    this.#selected.push(card);
  }
  #clearSelect() {
    this.#selected.forEach((card) => card.unSelect());
    this.#selected = [];
  }
  #match() {
    this.event("guesses", ++this.#data.guesses);
    this.#selected.forEach((card) => card.faceUp());
    if (this.#selected[0].symbol === this.#selected[1].symbol) {
      this.#selected.forEach((card) => card.hide());
      this.event("score", (this.#data.score += this.#data.bounty));
      this.event("rating", this.#data.getRating());
      this.event("pairsLeft", --this.#data.pairsLeft);
      this.#setValue("bounty", this.#bountyLimit(this.#data.bounty + 2));
      if (!this.#data.pairsLeft) {
        this.#setValue("mode", "ended");
        if (this.#data.trySetHighScore()) {
          this.event("highScore", this.#data.score);
          this.#setValue("message", "New Highscore, Congratulations!");
        } else {
          this.#setValue("message", "You won the game!");
        }
      } else {
        this.#setValue("message", "You found a pair!");
      }
    } else {
      this.#setValue("bounty", this.#bountyLimit(this.#data.bounty - 1));
      this.#setValue("message", "No luck, try again!");
    }
  }

  reset(pairs) {
    this.#clickedCards.forEach((card, idx, arr) => {
      if (card) {
        card.unSelect();
        card.faceDown();
        card.show();
        arr[idx] = undefined;
      }
    });
    pairs = Math.min(this.#symbols.length, Math.max(6, pairs));
    this.#data.reset(pairs);
    for (const [key, value] of Object.entries(this.#data)) this.event(key, value);
    this.event("rating", 0);
  }

  get pairs() {
    return this.#data.pairs;
  }
  get pairsLeft() {
    return this.#data.pairsLeft;
  }
  get score() {
    return this.#data.score;
  }
  get bounty() {
    return this.#data.bounty;
  }
  get guesses() {
    return this.#data.guesses;
  }
  get rating() {
    return this.#data.getRating();
  }
  get symbolCount() {
    return this.#symbols.length;
  }
  get symbols() {
    return [...this.#symbols];
  }
  get highScore() {
    return this.#data.getHighScore();
  }
  get mode() {
    return this.#data.mode;
  }
  get message() {
    return this.#data.message;
  }

  cardsReady() {
    this.#setValue("mode", "play");
  }

  click(cardInfo) {
    this.#clickedCards[cardInfo.index] = cardInfo;
    if (this.#data.mode !== "play") return;
    switch (this.#selected.length) {
      case 0:
        this.#select(cardInfo);
        this.#setValue("message", "Good, now select another card.");
        return;
      case 1:
        if (this.#selected[0].index === cardInfo.index) {
          this.#clearSelect();
          this.#setValue("message", "Ok, maybe some other card.");
        } else {
          this.#select(cardInfo);
          this.#match();
        }
        return;
      default:
        if (this.#selected[0].index !== cardInfo.index && this.#selected[1].index !== cardInfo.index) {
          this.#clearSelect();
          this.#setValue("message", "Good, now select another card.");
          this.#select(cardInfo);
        } else {
          this.#clearSelect();
          this.#setValue("message", "Select a card.");
        }
    }
  }
}
