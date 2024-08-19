import { db } from "@/server/db";
import { userMedia } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "@/server/auth";
import { eq } from "drizzle-orm";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length === 1) {
    return values[0]!;
  }
};

export async function GET() {
  try {
    const session = await getServerAuthSession();
    const userId = await session?.user?.id;
    const userMediaRow = await db
      .select({ imagePath: userMedia.imagePath })
      .from(userMedia)
      .where(eq(userMedia.userId, userId as number))
      .then(takeUniqueOrThrow);

    return NextResponse.json({ userMediaRow });
  } catch (e) {
    console.error("Error while trying to get userMedia\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
