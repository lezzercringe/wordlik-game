"use client";
import { FC, useState } from "react";
import { WordRow } from "./WordRow";

type Props = {
  word: string;
  triesCount: number;
};

export const GameField: FC<Props> = ({ word, triesCount }) => {
  const tries = Array.from({ length: triesCount }, (_, index) => index);

  const [isGameOver, setisGameOver] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number | null>(0);

  const submitHandler = (enteredWord: string) => {
    if (activeLine === triesCount - 1) {
      setisGameOver(true);
      setActiveLine(null);
      return;
    }
    if (enteredWord === word) {
      setisGameOver(true);
    }
    setActiveLine((prev) => (prev as number) + 1);
  };

  return (
    <div className="flex flex-col  gap-3 p-3 ">
      {isGameOver && <p>Game over!</p>}
      {tries.map((tryNumber) => (
        <WordRow
          isSubmitted={activeLine === null || activeLine > tryNumber}
          isActive={!isGameOver && activeLine === tryNumber}
          word={word}
          submit={submitHandler}
          key={tryNumber}
        />
      ))}
    </div>
  );
};
