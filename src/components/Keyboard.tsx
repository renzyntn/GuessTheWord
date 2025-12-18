import type { KeyboardProp } from "../types/proptypes";

function Keyboard({
  keyboardButton,
  isGameOver,
  letter,
  isGuessCorrect,
  isGuessWrong,
}: KeyboardProp) {
  return (
    <button
      className={`w-10 h-10 flex justify-center items-center text-black text-2xl font-bold rounded-sm ${
        isGuessCorrect ? "bg-green-500" : isGuessWrong ? "bg-red-500" : "bg-zinc-300"
      } ${
        isGameOver ? "" : "hover:cursor-pointer active:scale-90 transform duration-100 ease-in-out"
      }`}
      onClick={keyboardButton}
      disabled={isGameOver}
    >
      {letter}
    </button>
  );
}

export default Keyboard;
