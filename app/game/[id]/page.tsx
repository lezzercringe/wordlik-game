import { WordRecord } from "@/app/lib/types/api";
import { GameField } from "@/app/modules/Game/WordField";
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";

async function fetchWord(id: string): Promise<WordRecord> {
  const data = await kv.hgetall<WordRecord>(id);

  if (!data) notFound();
  return data;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const word = await fetchWord(id);

  return (
    <div className="w-full flex h-screen justify-center items-center">
      <GameField
        wordId={id}
        solvedTimes={word.solvedTimes}
        layout={word.layout}
        triesCount={5}
        word={word.word}
      />
    </div>
  );
}
