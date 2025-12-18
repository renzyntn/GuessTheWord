export type AttemptsProp = {
  color: string;
  backgroundColor: string;
  lostAttempts: boolean;
  name: string;
};

export type WordFieldProp = {
  isGameLost: boolean;
  guessedArray: boolean;
  revealWord: string;
};

export type KeyboardProp = {
  keyboardButton: () => void;
  isGameOver: boolean;
  letter: string;
  isGuessCorrect: boolean;
  isGuessWrong: boolean;
};

export type StatusProp = {
  isGameWon: boolean;
};

export type ButtonProp = {
  newGameButton: () => void;
};
