import { db } from "@/server/db";
import {
  comment,
  eventOfMatch,
  match,
  post,
  postMedia,
  user,
} from "@/server/db/schema";
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
    const postId = parseInt(params.id, 10);
    const postRecord = await db
      .select()
      .from(post)
      .where(eq(post.id, postId))
      .then(takeUniqueOrThrow);
    const userRecords = await db
      .select()
      .from(user)
      .where(eq(user.id, postRecord.userId))
      .then(takeUniqueOrThrow);
    const mediaRecords = await db
      .select()
      .from(postMedia)
      .where(eq(postMedia.postId, postId));

    const commentRecords = await db.query.comment.findMany({
      where: eq(comment.postId, postId),
      orderBy: [desc(comment.commentDate), desc(comment.commentTime)],
      with: {
        user: true,
        media: true,
      },
    });

    return NextResponse.json({
      postRecord,
      userRecords,
      mediaRecords,
      commentRecords,
    });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
