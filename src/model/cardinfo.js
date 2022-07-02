export default class CardInfo {
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
