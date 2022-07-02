export default class GameEventHandler {
  #call_functions;

  constructor() {
    this.#call_functions = {};
  }

  event(name, value) {
    const func_arr = this.#call_functions[name];
    if (!func_arr) return;
    func_arr.forEach((x) => x(value));
  }

  register(name, func) {
    if (typeof func !== "function") return;
    const func_arr = this.#call_functions[name];
    if (func_arr) {
      if (!func_arr.includes(func)) func_arr.push(func);
    } else {
      this.#call_functions[name] = [func];
    }
  }
}
