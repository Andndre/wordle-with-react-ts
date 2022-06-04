import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import Popup from "reactjs-popup";
import { Logo } from "./components/logo";
import { KEYS } from "./constants/keys";
import { useWordle } from "./hooks/useWordle";
import { letterclass, popupcontent } from "./types/types";

function GameLetter({ text, delay }: { text: letterclass; delay: number }) {
  return (
    <div
      className={
        "select-none flex justify-center items-center w-14 h-14 text-2xl font-bold rounded-md delay-[" +
        delay +
        "ms] " +
        (text.status ? text.status : "empty")
      }
    >
      {text.letter}
    </div>
  );
}

export function initKeys() {
  let res: letterclass[][] = [];
  for (let i in KEYS) {
    res.push([]);
    for (let j in KEYS[i]) {
      res[i].push({ letter: KEYS[i][j].letter, status: "empty" });
    }
  }
  return res;
}

function App() {
  const [popupContent, setPopupContent] = useState<popupcontent>({
    title: "",
    text: "",
    actions: [],
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [keys, setKeys] = useState<letterclass[][]>(initKeys());
  const { rows, input, backspace, proceed } = useWordle(
    setOpenPopup,
    setPopupContent,
    keys,
    setKeys
  );
  return (
    <div
      className='focus:outline-none'
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          proceed();
        }
        if (e.key === "Backspace") {
          backspace();
        }
        if (e.key.match(/^[a-z]$/i)) {
          input(e.key.toLowerCase());
        }
      }}
      tabIndex={0}
    >
      <Popup
        open={openPopup}
        position='center center'
        closeOnDocumentClick={false}
      >
        <div className='max-w-md w-[80vw] text-center text-black bg-gray-50 p-6 flex flex-col shadow-md rounded-md items-center gap-2 popup'>
          <h3 className='text-xl font-bold'>{popupContent.title}</h3>
          <p>{popupContent.text}</p>
          <div className='flex justify-center gap-2 flex-wrap'>
            {popupContent.actions.map((action, index) => (
              <button
                className='p-2 rounded-full bg-green-500 text-white focus:outline-none'
                key={index + "-action"}
                onClick={action.onClick}
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      </Popup>
      <Logo />
      <main className='flex flex-col'>
        {/* GAMEBOARD */}
        <div className='flex-1 mt-6 flex flex-col gap-2'>
          {rows.map((row, index) => (
            <div key={index + "-row"} className='flex gap-2 justify-center row'>
              {row.map((col, idx) => (
                <GameLetter
                  key={index + "-row-" + idx + "-col"}
                  text={col}
                  delay={300}
                />
              ))}
            </div>
          ))}
        </div>
        {/* KEYBOARD*/}
        {/* ROWS */}
        <div className='flex-1 flex flex-col gap-1 mx-auto w-[95vw] max-w-screen-sm mt-4'>
          {keys.map((keyrow, idx) => {
            return (
              // COLS
              <div className='flex w-full gap-1' key={idx + "-keyrow"}>
                <>
                  {idx == 2 && (
                    <button
                      className='flex flex-[2] justify-center items-center rounded w-12 h-12 bg-gray-200 text-gray-800 border-2 border-gray-300 focus:outline-none capitalize font-bold text-lg'
                      onClick={backspace}
                    >
                      <FiDelete
                        style={{
                          stroke: "black",
                          strokeWidth: "3",
                        }}
                      />
                    </button>
                  )}
                  {keyrow.map((key, index) => {
                    return (
                      <button
                        className={
                          "flex flex-1 justify-center items-center rounded w-12 h-12 text-gray-800 focus:outline-none capitalize font-bold text-lg " +
                          key.status
                        }
                        key={idx + "-keyrow-" + index + "-keycol"}
                        onClick={() => input(key.letter)}
                      >
                        {key.letter}
                      </button>
                    );
                  })}
                  {idx == 2 && (
                    <button
                      className='flex flex-[2] justify-center items-center rounded w-12 h-12 bg-gray-200 text-gray-800 border-2 border-gray-300 focus:outline-none capitalize font-bold text-lg'
                      onClick={proceed}
                    >
                      Enter
                    </button>
                  )}
                </>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
