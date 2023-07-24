import { NextResponse } from "next/server";
import { z } from "zod";
import { kv } from "@vercel/kv";
import { uid } from "uid";
import { WordRecord } from "@/app/lib/types/api";
import { incrementSolvedTimes } from "@/app/lib/utils/incrementSolvedTimes";

const payloadSchema = z.object({
  id: z.string(),
});

type PayloadType = z.infer<typeof payloadSchema>;

export async function POST(request: Request) {
  try {
    const res = payloadSchema.parse(await request.json());

    await incrementSolvedTimes(res.id);
    return NextResponse.json({ id: res.id });
  } catch (e) {
    return NextResponse.json("Error bad request", { status: 400 });
  }
}
