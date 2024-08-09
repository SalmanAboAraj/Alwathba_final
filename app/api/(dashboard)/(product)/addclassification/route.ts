import { db } from "@/server/db";
import { classification } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newClassification = await request.json();
    await db.insert(classification).values(newClassification);
    return NextResponse.json({ msg: "Classification created" });
  } catch (e) {
    console.log(e);
  }
}
