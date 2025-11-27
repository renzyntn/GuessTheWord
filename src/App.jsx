import { useState, useEffect } from "react";
import { attempts } from "./attempts";
import Confetti from "react-confetti";
import Status from "./components/Status";
import Attempts from "./components/Attempts";
import WordField from "./components/WordField";
import Keyboard from "./components/Keyboard";
import Button from "./components/Button";

function App() {

  // Initialize a string state in case of fetch failure, else if not, it will set the state to a new fetched word.
  const [currentWord, setCurrentWord] = useState("react");
  // Initialize an empty array state to store all of the guessed letters.
  const [guessedArray, setGuessedArray] = useState([]);

  // Declare a variable that doesn't contain correct guesses to lessen the attempt chances.
  const wrongGuessCount = guessedArray.filter(wrongLetter => !currentWord.includes(wrongLetter)).length;
  // Declare a boolean that will check if game is won by checking guesses that includes the correct letter from currentWord state.
  const isGameWon = currentWord.split("").every(correctLetter => guessedArray.includes(correctLetter));
  // Declare a boolean that will check if game is lost if wrongGuessCount is greater than or equals to 8 (length of attempts array).
  const isGameLost = wrongGuessCount >= attempts.length - 1;
  // Declare a boolean that will check if game is over if one of the variables is true.
  const isGameOver = isGameWon || isGameLost;

  // Declare a string that will be mapped so it displays buttons as keyboard in the DOM.
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Declare a function (fetchWord()) that will fetch a new word from the API.
  const fetchWord = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      if (!response.ok) {
        throw new Error("There was a problem with the API");
      }
      const data = await response.json();
      const word = data[0].word.split(" ").join(""); // Convert the value (string) to array and then join them together (to remove spaces).
      setCurrentWord(word); // Set the API data response in currentWord state.
    } catch (err) {
      console.log(err);
    }
  };

  // Declare useEffect to fetch a new word from the API when app first mounts.
  useEffect(() => {
    fetchWord();
  }, []);

  // Declare a function that evaluates when the same button (or letter) gets click. If so, prevent adding that duplicate in guessedArray.
  function keyboardButton(letter) {
    setGuessedArray(prevGuess => prevGuess.includes(letter) 
      ? prevGuess 
      : [...prevGuess, letter]);
  };

  // Declare a function that will set guessedArray to empty and re-fetch a new word.
  function newGameButton() {
    setGuessedArray([]); // If New Game button gets set guessArray state to empty.
    fetchWord(); // If New Game button gets clicked, fetch a new word.
  };

  // Declare a variable that will display all of Attempts (or lives) Component based on 'attempts' array length.
  const displayAttempt = attempts.map((attempt, index) => {
    const lostAttempts = index < wrongGuessCount; // Boolean variable variable that will return true and lessen the attempt opacity (indicates lost attempt).

    return (
      <Attempts 
        key={attempt.name}
        color={attempt.color}
        backgroundColor={attempt.backgroundColor}
        lostAttempts={lostAttempts}
        name={attempt.name}
      />
    )
  });

  // Declare a variable that will display all of WordField Component based on 'currentWord' total string length as empty containers.
  const displayWordField = currentWord.split("").map((letter, index) => {
    const revealWord = isGameLost || guessedArray.includes(letter); // Boolean variable that will return true if one of the conditions are met.

    return (
      <WordField 
        key={index}
        isGameLost={isGameLost}
        guessedArray={!guessedArray.includes(letter)}
        revealWord={revealWord ? letter.toUpperCase() : ""} // If true then reveal currentWord letter as capital.
      />
    )
  });

  // Declare a varibale that will display all of Keyboard Component Elements based on 'alphabet' total string length.
  const displayKeyboard = alphabet.split("").map(letter => {
    const isGuessCorrect = guessedArray.includes(letter) && currentWord.includes(letter); // Boolean variable that will return true if user guess is correct.
    const isGuessWrong = guessedArray.includes(letter) && !currentWord.includes(letter); // Boolean variable that will return true if user guess is incorrect.

    return (
      <Keyboard 
        key={letter}
        keyboardButton={() => keyboardButton(letter)} // Add letter to guessedArray state.
        isGameOver={isGameOver}
        isGuessCorrect={isGuessCorrect}
        isGuessWrong={isGuessWrong}
        letter={letter.toUpperCase()}
      />
    )
  });

  return (
    <main className="max-w-150 h-screen mx-auto flex flex-col justify-center items-center space-y-8 font-hanken">
      {isGameWon && 
        <Confetti />
      }
      <header className="max-w-90 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-zinc-300 mb-1">
            Guess the Word
          </h1>
          <p className="text-base font-medium text-gray-400 mb-5">
            Guess the word in under 8 attempts to keep the programming world safe from Assembly!
          </p>
          <div className="max-w-full h-15">
            {isGameOver && 
              <Status 
                isGameWon={isGameWon}/>
            }
          </div>
        </div>
      </header>
      <div className="max-w-85 h-auto flex flex-wrap justify-center items-center gap-1">
        {displayAttempt}
      </div>
      <div className="flex flex-row gap-1">
        {displayWordField}
      </div>
      <div className="max-w-120 flex flex-wrap justify-center items-center gap-2">
        {displayKeyboard}
      </div>
      <div className="w-60 h-10">
        {isGameOver && 
          <Button
            newGameButton={newGameButton}
          />
        }
      </div>
    </main>
  )
}

export default App;