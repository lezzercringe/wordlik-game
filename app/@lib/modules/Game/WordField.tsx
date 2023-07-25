"use client";
import { FC, useState } from "react";
import { WordRow } from "./WordRow";
import { Keyboard, UserCircle2 } from "lucide-react";
import { incrementSolvedTimesQuery } from "@utils/incrementSolvedTimes";
import { Layout } from "@lib/types/api";

type Props = {
  word: string;
  triesCount: number;
  solvedTimes: number;
  layout: Layout;
  wordId: string;
};

export const GameField: FC<Props> = ({
  word,
  triesCount,
  layout,
  wordId,
  solvedTimes,
}) => {
  const tries = Array.from({ length: triesCount }, (_, index) => index);

  const [isWin, setIsWin] = useState<boolean>(false);
  const [isGameOver, setisGameOver] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number | null>(0);
  const [optimisticSolvedTimes, setOptimisticSolvedTimes] =
    useState<number>(solvedTimes);

  const submitHandler = (enteredWord: string) => {
    if (enteredWord === word) {
      setisGameOver(true);
      setIsWin(true);
      setOptimisticSolvedTimes((prev) => prev + 1);
      incrementSolvedTimesQuery(wordId);
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
      <span className="flex gap-3 opacity-50 font-bold">
        <Keyboard />
        {layout === "us" ? "Английская раскладка" : "Русская раскладка"}
      </span>
      <span className="flex gap-3 opacity-50 font-bold">
        <UserCircle2 />
        Решено {optimisticSolvedTimes} раз {isWin && "🎉"}
      </span>
      {tries.map((tryNumber) => (
        <WordRow
          layout={layout}
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
