import { PayloadType } from "@/app/api/addword/route";
import { HOST_URL } from "../constants";
import { AddWordResponse } from "@lib/types/api";
import ky from "ky";

export const submitWordRequest = async (
  body: PayloadType
): Promise<Response> => {
  return await await fetch(`${HOST_URL}/api/addword`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
