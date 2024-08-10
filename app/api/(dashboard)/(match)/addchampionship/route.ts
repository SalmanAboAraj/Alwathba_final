import { db } from "../../../../../server/db";
import { championship } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const championships = await db
      .select({ name: championship.name,id:championship.id })
      .from(championship);
    return NextResponse.json(championships);
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
    const newChampionship = await request.json();
    await db.insert(championship).values(newChampionship);
    return NextResponse.json({ msg: "championship created" });
  } catch (e) {
    console.log(e);
  }
}
