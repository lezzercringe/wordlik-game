"use client";
import { FC, useState } from "react";
import { WordRow } from "./WordRow";

type Props = {
  word: string;
  triesCount: number;
};

export const GameField: FC<Props> = ({ word, triesCount }) => {
  const tries = Array.from({ length: triesCount }, (_, index) => index);

  const [isWin, setIsWin] = useState<boolean>(false);
  const [isGameOver, setisGameOver] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number | null>(0);

  const submitHandler = (enteredWord: string) => {
    if (enteredWord === word) {
      setisGameOver(true);
      setIsWin(true);
    }
    if (activeLine === triesCount - 1) {
      setActiveLine(null);
      setisGameOver(true);
      if (word !== enteredWord) {
        setIsWin(false);
      }
    } else {
      setActiveLine((prev) => (prev as number) + 1);
    }
  };

  return (
    <div className="flex flex-col  gap-3 p-3 ">
      {tries.map((tryNumber) => (
        <WordRow
          isSubmitted={activeLine === null || activeLine > tryNumber}
          isActive={!isGameOver && activeLine === tryNumber}
          word={word}
          submit={submitHandler}
          key={tryNumber}
        />
      ))}
      {isGameOver && isWin && (
        <p>
          You won! {activeLine ? activeLine : tries.length}/{tries.length}{" "}
          tries!
        </p>
      )}{" "}
      {isGameOver && !isWin && <p>You lost! So sorry</p>}
    </div>
  );
};
