import { db } from "@/server/db";
import { match } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { gte, asc } from "drizzle-orm";

export async function GET() {
  try {
    const matches = await db.query.match.findMany({
      with: {
        team: true,
        court: true,
        championship: true,
        matchState: true,
      },
      where: gte(match.matchDate, new Date().toISOString()),
      orderBy: asc(match.matchDate),
    });

    return NextResponse.json(matches);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
