import { NextResponse } from "next/server";
import { z } from "zod";
import { kv } from "@vercel/kv";
import { uid } from "uid";

const payloadSchema = z.object({
  word: z
    .string()
    .min(3)
    .max(10)
    .regex(/^(?:[A-ZА-Я]+)$/),
});

type PayloadType = z.infer<typeof payloadSchema>;

export async function POST(request: Request) {
  try {
    const res = payloadSchema.parse(await request.json());
    const id = uid();
    await kv.set(id, res.word);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json("Error bad request", { status: 400 });
  }
}
