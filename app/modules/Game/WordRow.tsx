import { FC, useState } from "react";
import { WordLetter } from "./WordLetter";
import { useKeyPress } from "@/app/hooks/useKeyPress";

type Props = {
  word: string;
  isActive: boolean;
  isSubmitted: boolean;
  submit: () => void;
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
      (word.length === enteredLetters.length && key !== "Backspace")
    )
      return;

    if (key === "Backspace" && enteredLetters.length > 0) {
      setEnteredLetters((prev) => prev.slice(0, prev.length - 1));
      return;
    }

    if (key.length > 1 || !/[а-яА-Яa-zA-Z]/.test(key)) {
      return;
    }
    setEnteredLetters((prev) => [...prev, key]);
  };

  useKeyPress(typingHandler);

  return (
    <div className="flex gap-3  ">
      {[...enteredLetters, ...NOT_ENTERED_LETTERS].map((letter, index) => (
        <WordLetter key={index} status="none" letter={letter} />
      ))}
      {isActive && <button onClick={submit}>Submit</button>}
    </div>
  );
};
