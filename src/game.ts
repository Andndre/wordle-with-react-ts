import { POSSIBLE_ANSWERS } from "./constants/words";

export default class Game {
  rows: string[][];
  isChallangeMode: boolean;
  word: string;
  #col = 0;
  #row = 0;
  #pause = false;
  static instance: Game;
  constructor(word?: string, isChallangeMode?: boolean) {
    this.word =
      word ||
      POSSIBLE_ANSWERS[Math.floor(Math.random() * POSSIBLE_ANSWERS.length)];
    this.isChallangeMode = isChallangeMode || false;
    this.rows = new Array(6).fill(new Array(this.word.length).fill(""));
  }
  static get() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
  delete() {
    if (this.#pause) return;
    if (--this.#col < 0) this.#col = 0;
    this.rows[this.#row][this.#col] = "";
    // this.rows[this.#row][this.#col].classList.remove("text");
  }

  input(letter: string) {
    if (this.#pause) return;
    if (this.#row == 6) return;
    if (this.#col == this.word.length) return;
    this.rows[this.#row][this.#col] = letter.toUpperCase();
    // this.rows[this.#row][this.#col].classList.add("text");
    console.log(this.rows);
    this.#col++;
  }
}
