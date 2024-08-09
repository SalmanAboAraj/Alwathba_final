import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { desc, asc } from "drizzle-orm";

export async function GET() {
  try {
    const users = await db.select().from(user);
    return NextResponse.json(users);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
