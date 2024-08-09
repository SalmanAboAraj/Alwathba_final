import { db } from "@/server/db";
import { court } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newCourt = await request.json();
    await db.insert(court).values(newCourt);
    return NextResponse.json({ msg: "court created" });
  } catch (e) {
    console.log(e);
  }
}
