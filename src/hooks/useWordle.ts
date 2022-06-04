import { useState } from "react";
import { initKeys } from "../App";
import { ALLOWED_GUESSES, POSSIBLE_ANSWERS } from "../constants/words";
import {
  cellclass,
  joinLetters,
  letterclass,
  popupcontent,
} from "../types/types";
import { randInt, str_binarySearch } from "../utils";

export function useWordle(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPopup: React.Dispatch<React.SetStateAction<popupcontent>>,
  keys: letterclass[][],
  setKeys: React.Dispatch<React.SetStateAction<letterclass[][]>>
) {
  // --INIT--
  const [word, setWord] = useState(
    POSSIBLE_ANSWERS[randInt(0, POSSIBLE_ANSWERS.length - 1)]
  );
  const [rows, setRows] = useState<letterclass[][]>(initRows());
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  // --FUNCS--
  function initRows() {
    // same as new Array(6).fill(new Array(word.length).fill("")), but all the elements are different instances
    let res: letterclass[][] = [];
    for (let i = 0; i < 6; i++) {
      // res.push(new Array(word.length).fill({ letter: "" }));
      res.push([]);
      for (let j = 0; j < word.length; j++) {
        res[i].push({ letter: "" });
      }
    }
    return res;
  }
  // get key based on the letter
  function getKey(letter: string) {
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < keys[i].length; j++) {
        if (keys[i][j].letter.toLowerCase() == letter.toLowerCase())
          return keys[i][j];
      }
    }
    return null;
  }
  // simulates keyboard input (called when the user clicks one of the keyboard buttons)
  function input(letter: string) {
    if (row == 6) return;
    if (col == word.length) return;
    rows[row][col].letter = letter.toUpperCase();
    rows[row][col].status = "letter";
    setRows([...rows]);
    setCol(col + 1);
  }
  // delete one letter from the current row
  function backspace() {
    if (col == 0) return;
    rows[row][col - 1].letter = "";
    rows[row][col - 1].status = "empty";
    setRows([...rows]);
    setCol(col - 1);
  }
  // get status for each letter in the current row (correct/in-word/not-in-word)
  function guess(): cellclass[] {
    const RES: cellclass[] = [];
    let answer = [...word];
    let input = rows[row];
    history.push(joinLetters(input));
    setHistory([...history]);
    // assign status for all letters with 'not-in-word'
    for (let i = 0; i < 5; i++) {
      RES[i] = "not-in-word";
    }
    // assign status for the letters that 'correct', then override it to an empty string
    for (let i = 0; i < 5; i++) {
      if (answer[i] === input[i].letter) {
        answer[i] = "";
        RES[i] = "correct";
      }
    }
    // assign for the 'in-word' letters
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (answer[j] === input[i].letter && RES[i] === "not-in-word") {
          answer[j] = "";
          RES[i] = "in-word";
        }
      }
    }
    return RES;
  }
  // called when the user presses enter
  function proceed() {
    if (row == 6) return;
    if (col !== 5) return;
    // combine all letters in the current row into a single string
    let w = joinLetters(rows[row]);
    // check if the word is in the dictionary
    if (
      str_binarySearch(POSSIBLE_ANSWERS, w) === -1 &&
      str_binarySearch(ALLOWED_GUESSES, w) === -1
    ) {
      setPopup({
        title: "Word doesn't exist!",
        text: "The word is not in the dictionary",
        actions: [
          {
            text: "Okay",
            onClick: () => {
              setOpen(false);
            },
          },
        ],
      });
      setOpen(true);
      return;
    }
    // check if the word is in the history
    if (history.indexOf(w.toUpperCase()) !== -1) {
      setPopup({
        title: "Invalid guess",
        text: "You cannot input the same word twice",
        actions: [
          {
            text: "Okay",
            onClick: () => {
              setOpen(false);
            },
          },
        ],
      });
      setOpen(true);
      return;
    }
    // after all the check, finally get the status for each letter in the current row
    const RES = guess();
    let win = true;
    // assign the status for each letter in the current row
    for (let idx in RES) {
      rows[row][idx].status = RES[idx];
      let key = getKey(rows[row][idx].letter);
      if (key) {
        key.status = RES[idx];
        setKeys(keys);
      }
      setRows([...rows]);
      // if at least one letter is not correct, then win is false
      if (RES[idx] != "correct") win = false;
    }
    setCol(0);
    setRow(row + 1);

    // row == 5 is the last row
    if (row == 5 || win) {
      setPopup({
        title: win ? "You win!" : "You lose!",
        text: "the correct answer is " + word,
        actions: [
          {
            text: "Okay",
            onClick: () => {
              setOpen(false);
            },
          },
        ],
      });
      setOpen(true);
      setWord(POSSIBLE_ANSWERS[randInt(0, POSSIBLE_ANSWERS.length - 1)]);
      setRows(initRows());
      setRow(0);
      setKeys(initKeys());
      setHistory([]);
    }

    return;
  }

  return {
    rows,
    setRows,
    word,
    setWord,
    col,
    setCol,
    row,
    setRow,
    input,
    backspace,
    proceed,
  };
}
