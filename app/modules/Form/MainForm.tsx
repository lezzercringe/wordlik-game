"use client";
import { ArrowBigRight } from "lucide-react";
import { FC, useRef, useState } from "react";
import { HOST_URL as URL } from "@/app/lib/constants";
import Link from "next/link";

const regexCyrillicUpper = /^[А-ЯЁ]+$/;
const regexLatinUpper = /^[A-Z]+$/;

export const MainForm: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [responseId, setResponseId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!ref.current || ref.current.value.length < 3) return;
    const value = ref.current.value.toUpperCase();
    let layout: "us" | "ru" | null = null;
    if (regexCyrillicUpper.test(value)) layout = "ru";
    if (regexLatinUpper.test(value)) layout = "us";
    if (!layout) return;

    try {
      const response = await (
        await fetch(`https://${URL}/api/addword`, {
          method: "POST",
          body: JSON.stringify({
            word: value.toUpperCase(),
            layout,
          }),
        })
      ).json();
      setResponseId(response.id);
    } catch (e) {
      return;
    }
  };

  return (
    <div className="space-x-2 flex">
      <input
        placeholder="огурец"
        ref={ref}
        className="p-2 rounded w-32 bg-gray-500 outline-none"
      />
      <button onClick={handleSubmit} className="p-2 rounded bg-gray-500">
        <ArrowBigRight />
      </button>
      {responseId && (
        <Link href={`game/${responseId}`}>
          https:/{URL}/game/{responseId}
        </Link>
      )}
    </div>
  );
};
