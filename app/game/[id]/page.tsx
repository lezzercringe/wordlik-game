import { GameField } from "@/app/modules/Game/WordField";
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";

async function fetchWord(id: string): Promise<string> {
  const data = await kv.get<string>(id);
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
      <GameField triesCount={5} word={word} />
    </div>
  );
}
