import { db } from "../../../../../server/db";
import { classification } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const classifications = await db
      .select({ name: classification.name,id:classification.id })
      .from(classification);
    return NextResponse.json(classifications);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const newClassification = await request.json();
    await db.insert(classification).values(newClassification);
    return NextResponse.json({ msg: "Classification created" });
  } catch (e) {
    console.log(e);
  }
}
