import { db } from "../../../../../server/db";
import { size } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const sizes = await db
      .select({ name: size.name,id:size.id })
      .from(size);
    return NextResponse.json(sizes);
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
    const newSize = await request.json();
    await db.insert(size).values(newSize);
    return NextResponse.json({ msg: "size created" });
  } catch (e) {
    console.log(e);
  }
}
