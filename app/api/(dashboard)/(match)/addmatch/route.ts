import { db } from "@/server/db";
import { match } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newmatch = await request.json();
    await db.insert(match).values(newmatch);
    return NextResponse.json({ msg: "match created" });
  } catch (e) {
    console.log(e);
  }
}
