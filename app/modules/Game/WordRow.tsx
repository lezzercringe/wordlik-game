import { FC, useEffect, useState } from "react";
import { WordLetter } from "./WordLetter";

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

  useEffect(() => {
    if (!isActive) {
      return;
    }
  }, [enteredLetters, isActive]);

  return (
    <div className="flex gap-3  ">
      {[...enteredLetters, ...NOT_ENTERED_LETTERS].map((letter, index) => (
        <WordLetter key={index} status="none" letter={letter} />
      ))}
      {isActive && <button onClick={submit}>Submit</button>}
    </div>
  );
};
