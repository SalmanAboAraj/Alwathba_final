import { db } from "@/server/db";
import { eventOfMatch, match, user } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const matchId = parseInt(params.id, 10);
    const matchRecord = await db
      .select()
      .from(match)
      .where(eq(match.id, matchId))
      .then(takeUniqueOrThrow);
    const eventRecords = await db
      .select()
      .from(eventOfMatch)
      .where(eq(eventOfMatch.matchId, matchId))
      .orderBy(desc(eventOfMatch.createdAt));

    return NextResponse.json({ matchRecord, eventRecords });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
