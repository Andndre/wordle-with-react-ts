import { letterclass } from "../types/types";

export const KEYS: letterclass[][] = [
  [
    { letter: "q" },
    { letter: "w" },
    { letter: "e" },
    { letter: "r" },
    { letter: "t" },
    { letter: "y" },
    { letter: "u" },
    { letter: "i" },
    { letter: "o" },
    { letter: "p" },
  ],
  [
    { letter: "a" },
    { letter: "s" },
    { letter: "d" },
    { letter: "f" },
    { letter: "g" },
    { letter: "h" },
    { letter: "j" },
    { letter: "k" },
    { letter: "l" },
  ],
  [
    { letter: "z" },
    { letter: "x" },
    { letter: "c" },
    { letter: "v" },
    { letter: "b" },
    { letter: "n" },
    { letter: "m" },
  ],
];

export function getKeyByLetter(letter: string) {
  for (let i = 0; i < KEYS.length; i++) {
    for (let j = 0; j < KEYS[i].length; j++) {
      if (KEYS[i][j].letter === letter) {
        return KEYS[i][j];
      }
    }
  }
  return null;
}
