"use client";
import { ArrowBigRightDash, Frown, Smile } from "lucide-react";
import { getErrorMessage, useWordInput } from "../../hooks/useWordInput";
import { Fade } from "@ui/Fade";
import { submitWordRequest } from "../../utils/submitWord";
import { AddWordResponse } from "../../types/api";
import { useEffect, useState } from "react";
import { HOST_URL } from "../../constants";
import Link from "next/link";

export const WordForm = () => {
  const { error, props, layout, value, setError } = useWordInput();

  const [responseId, setResponseId] = useState<null | string>(null);
  const submitHandler = async () => {
    if (error || value === "") return;
    const res = await submitWordRequest({ word: value, layout });
    if (!res.ok) {
      setError("server");
    } else {
      const data: AddWordResponse = await res.json();
      setResponseId(data.id);
    }
  };

  useEffect(() => {
    if (error) {
      setResponseId(null);
    }
  }, [error]);

  return (
    <div>
      <div className="flex justify-center relative items-center  w-full">
        <input
          {...props}
          className="p-3 uppercase font-bold text-center border-gray-500 active: outline-none bg-transparent border"
        />
        <button onClick={submitHandler} className="p-3 border-gray-500 border">
          <ArrowBigRightDash />
        </button>
        {error && (
          <div className="flex text-gray-500 mt-5 justify-center absolute top-12 items-center w-full">
            <Fade className="flex gap-3" inState={!!error}>
              <span>{getErrorMessage(error)} Простите.</span> <Frown />
            </Fade>
          </div>
        )}
        {responseId && (
          <div className="flex text-gray-500 mt-5 justify-center absolute top-12 items-center w-full">
            <Fade className="flex gap-3 items-center" inState={!!responseId}>
              <span>Ваша ссылка: </span>
              <Link
                href={`${HOST_URL}/game/${responseId}`}
                className="text-gray-200 hover:opacity-70 cursor-pointer"
              >{`${HOST_URL}/game/${responseId}`}</Link>
              <Smile />
            </Fade>
          </div>
        )}
      </div>
    </div>
  );
};
