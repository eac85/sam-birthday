import React, { useState, useEffect } from "react";
import "./Wordle.css";

const TARGET_WORD = "SAMMY";
const MAX_GUESSES = 6;
const WORD_LENGTH = TARGET_WORD.length;

export default function Wordle() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasWon) return;
      if (e.key === "Enter" && currentGuess.length === WORD_LENGTH) {
        const newGuess = currentGuess.toUpperCase();
        setGuesses([...guesses, newGuess]);
        setCurrentGuess("");
        if (newGuess === TARGET_WORD) {
          setHasWon(true);
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, hasWon]);

  return (
    <div className="wordle-wrapper">
      <h1 className="wordle-title">🎉 Birthday Wordle 🎉</h1>
      <div className="wordle-grid">
        {[...Array(MAX_GUESSES)].map((_, i) => {
          const guess = guesses[i] || (i === guesses.length ? currentGuess : "");
          return (
            <div className="wordle-row" key={i}>
              {[...Array(WORD_LENGTH)].map((_, j) => {
                const letter = guess[j] || "";
                let status = "";

                if (guesses[i]) {
                  if (letter === TARGET_WORD[j]) {
                    status = "correct";
                  } else if (TARGET_WORD.includes(letter)) {
                    status = "present";
                  } else {
                    status = "absent";
                  }
                }

                return (
                  <div className={`cell ${status}`} key={j}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {hasWon && <h2 className="win-text">🎉 You got it! Happy Birthday Sam! 🎉</h2>}
    </div>
  );
}
