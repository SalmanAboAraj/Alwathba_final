import { db } from "@/server/db";
import { size } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newSize = await request.json();
    await db.insert(size).values(newSize);
    return NextResponse.json({ msg: "size created" });
  } catch (e) {
    console.log(e);
  }
}
