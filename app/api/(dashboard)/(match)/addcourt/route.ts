import { db } from "../../../../../server/db";
import { court } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const courts = await db
      .select({ name: court.name,id:court.id })
      .from(court);
    return NextResponse.json(courts);
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
    const newCourt = await request.json();
    await db.insert(court).values(newCourt);
    return NextResponse.json({ msg: "court created" });
  } catch (e) {
    console.log(e);
  }
}
