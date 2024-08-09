import { db } from "@/server/db";
import { championship } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newChampionship = await request.json();
    await db.insert(championship).values(newChampionship);
    return NextResponse.json({ msg: "championship created" });
  } catch (e) {
    console.log(e);
  }
}
