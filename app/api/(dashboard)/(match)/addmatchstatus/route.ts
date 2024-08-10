import { db } from "../../../../../server/db";
import { matchState } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const matchStates = await db
      .select({ name: matchState.name,id:matchState.id })
      .from(matchState);
    return NextResponse.json(matchStates);
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
    const newMatchState = await request.json();
    await db.insert(matchState).values(newMatchState);
    return NextResponse.json({ msg: "match state created" });
  } catch (e) {
    console.log(e);
  }
}
