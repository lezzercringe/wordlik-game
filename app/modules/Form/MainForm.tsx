"use client";
import { ArrowBigRight } from "lucide-react";
import { FC, useRef, useState } from "react";
import Link from "next/link";

const URL =
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
  "localhost:3000";

export const MainForm: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [responseId, setResponseId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!ref.current || ref.current.value.length < 3) return;
    try {
      const response = await (
        await fetch(`https://${URL}/api/addword`, {
          method: "POST",
          body: JSON.stringify({ word: ref.current.value.toUpperCase() }),
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
        <Link href={`http:/${URL}/game/${responseId}`}>
          http:/{URL}/game/{responseId}
        </Link>
      )}
    </div>
  );
};
