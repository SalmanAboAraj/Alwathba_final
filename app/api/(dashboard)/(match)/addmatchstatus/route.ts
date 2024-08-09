import { db } from "@/server/db";
import { matchState } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newMatchState = await request.json();
    await db.insert(matchState).values(newMatchState);
    return NextResponse.json({ msg: "match state created" });
  } catch (e) {
    console.log(e);
  }
}
