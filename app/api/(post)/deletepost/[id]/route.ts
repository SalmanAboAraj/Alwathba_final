import { db } from "@/server/db";
import { post, comment, postMedia, commentMedia } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import fs from "fs";
import { join } from "path";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

// update user information using post request
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const postId = parseInt(params.id, 10);

    // if bode contains a field password then hash it
    try {
      const postmedia = await db
        .delete(postMedia)
        .where(eq(postMedia.postId, postId))
        .returning({ path: postMedia.imagePath });
      // loop in postmedia and delete the file
      for (const path of postmedia) {
        const oldImagePath = join(process.cwd(), "public", path.path);
        if (fs.existsSync(oldImagePath)) {
          await fs.unlinkSync(oldImagePath);
        }
      }
    } catch (e) {
      console.error("Error while trying to delete postmedia\n", e);
    }
    try {
      const comments = await db
        .select({ id: comment.id })
        .from(comment)
        .where(eq(comment.postId, postId));
      for (const comment of comments) {
        const commentmedia = await db
          .delete(commentMedia)
          .where(eq(commentMedia.commentId, comment.id))
          .returning({ path: commentMedia.imagePath })
          .then(takeUniqueOrThrow);
        const oldImagePath = join(process.cwd(), "public", commentmedia.path);
        if (fs.existsSync(oldImagePath)) {
          await fs.unlinkSync(oldImagePath);
        }
      }
    } catch (e) {
      console.error("Error while trying to delete commentmedia\n", e);
    }
    try {
      await db.delete(comment).where(eq(comment.postId, postId));
    } catch (e) {
      console.error("Error while trying to delete comments\n", e);
    }
    await db.delete(post).where(eq(post.id, postId));

    // update user information

    return NextResponse.json({ message: "Post deleted" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
