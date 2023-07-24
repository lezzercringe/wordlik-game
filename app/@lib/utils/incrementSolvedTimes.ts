import { kv } from "@vercel/kv";
import { HOST_URL } from "../constants";

export const incrementSolvedTimes = async (id: string): Promise<number> => {
  return await kv.hincrby(id, "solvedTimes", 1);
};

export const incrementSolvedTimesQuery = async (id: string) => {
  return await fetch(`${HOST_URL}/api/incrementSolvedCount`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
};
