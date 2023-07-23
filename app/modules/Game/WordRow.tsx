import { FC, useState } from "react";
import { StatusUnion, WordLetter } from "./WordLetter";
import { useKeyPress } from "@/app/hooks/useKeyPress";

type Props = {
  word: string;
  isActive: boolean;
  isSubmitted: boolean;
  submit: (enteredWord: string) => void;
};

export const WordRow: FC<Props> = ({ word, isActive, isSubmitted, submit }) => {
  const WORD_LENGTH = word.length;

  const [enteredLetters, setEnteredLetters] = useState<string[]>([]);

  const NOT_ENTERED_LETTERS = Array.from(
    { length: WORD_LENGTH - enteredLetters.length },
    (_, index) => " "
  );

  // FIXME
  const typingHandler = (key: string) => {
    if (
      !isActive ||
      (word.length === enteredLetters.length &&
        key !== "Backspace" &&
        key !== "Enter")
    )
      return;

    if (key === "Backspace" && enteredLetters.length > 0) {
      setEnteredLetters((prev) => prev.slice(0, prev.length - 1));
      return;
    }
    if (key === "Enter" && enteredLetters.length === word.length) {
      submit(enteredLetters.join(""));
      return;
    }

    if (key.length > 1 || !/[а-яА-Яa-zA-Z]/.test(key)) {
      return;
    }
    setEnteredLetters((prev) => [...prev, key]);
  };

  useKeyPress(typingHandler);

  const computeStatus = (id: number): StatusUnion => {
    if (isActive) {
      return id === enteredLetters.length ||
        (id === WORD_LENGTH - 1 && enteredLetters.length === WORD_LENGTH)
        ? "editing"
        : "none";
    }
    if (isSubmitted) {
      if (enteredLetters[id] === word[id]) return "correct";
      if (word.includes(enteredLetters[id])) return "badly-placed";
    }
    return "none";
  };

  return (
    <div className="flex gap-3  ">
      {[...enteredLetters, ...NOT_ENTERED_LETTERS].map((letter, index) => (
        <WordLetter key={index} status={computeStatus(index)} letter={letter} />
      ))}
    </div>
  );
};
