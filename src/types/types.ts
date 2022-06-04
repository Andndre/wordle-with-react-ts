export type cellclass =
  | "correct"
  | "in-word"
  | "not-in-word"
  | "empty"
  | "letter";
export type letterclass = {
  letter: string;
  status?: cellclass;
};
export type popupactionbutton = {
  text: string;
  onClick: () => void;
};
export type popupcontent = {
  title: string;
  text: string;
  actions: popupactionbutton[];
};
export function joinLetters(letters: letterclass[]) {
  return letters.map((letter) => letter.letter).join("");
}
