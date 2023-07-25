import { ZodError, z } from "zod";
import { kv } from "@vercel/kv";
import { uid } from "uid";

import { NextResponse } from "next/server";
import type { WordRecord } from "@lib/types/api";

const payloadSchema = z.object({
  word: z
    .string()
    .min(3)
    .max(10)
    .regex(/^(?:[A-ZА-Я]+)$/),
  layout: z.union([z.literal("ru"), z.literal("us")]),
});

export type PayloadType = z.infer<typeof payloadSchema>;

export async function POST(request: Request) {
  try {
    const res = payloadSchema.parse(await request.json());
    const id = uid();

    const payload: WordRecord = {
      layout: res.layout,
      solvedTimes: 0,
      word: res.word,
    };

    await kv.hset(id, payload);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
