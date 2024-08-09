import { db } from "@/server/db";
import { eventOfMatch } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newEventOfMatch = await request.json();
    await db.insert(eventOfMatch).values(newEventOfMatch);
    return NextResponse.json({ msg: "Event Of Match created" });
  } catch (e) {
    console.log(e);
  }
}
