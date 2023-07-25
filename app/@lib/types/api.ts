export type WordRecord = {
  word: string;
  solvedTimes: number;
  layout: "ru" | "us";
};

export type Layout = "us" | "ru";
export type InputErrorType = "minLength" | "content" | "server";
export type AddWordResponse = { id: string };
