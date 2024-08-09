import { db } from "@/server/db";
import {
  post,
  comment,
  postMedia,
  commentMedia,
  userMedia,
  admin,
  player,
  user,
} from "@/server/db/schema";
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
    const userId = parseInt(params.id, 10);

    // if bode contains a field password then hash it
    try {
      const usermedia = await db
        .delete(userMedia)
        .where(eq(userMedia.userId, userId))
        .returning({ path: postMedia.imagePath });
      // loop in postmedia and delete the file
      for (const path of usermedia) {
        const oldImagePath = join(process.cwd(), "public", path.path);
        if (fs.existsSync(oldImagePath)) {
          await fs.unlinkSync(oldImagePath);
        }
      }
    } catch (e) {
      console.error("Error while trying to delete postmedia\n", e);
    }
    try {
      db.delete(admin).where(eq(admin.userId, userId));
    } catch (e) {
      console.error("Error while trying to delete admin\n", e);
    }
    try {
      await db.delete(player).where(eq(player.userId, userId));
    } catch (e) {
      console.error("Error while trying to delete player\n", e);
    }
    try {
      const posts = await db
        .select({ id: post.id })
        .from(post)
        .where(eq(post.userId, userId));
      for (const post of posts) {
        const postmedia = await db
          .delete(postMedia)
          .where(eq(postMedia.postId, post.id))
          .returning({ path: postMedia.imagePath });
        // loop in postmedia and delete the file
        for (const path of postmedia) {
          const oldImagePath = join(process.cwd(), "public", path.path);
          if (fs.existsSync(oldImagePath)) {
            await fs.unlinkSync(oldImagePath);
          }
        }
      }
    } catch (e) {
      console.error("Error while trying to delete postmedia\n", e);
    }
    try {
      const comments = await db
        .select({ id: comment.id })
        .from(comment)
        .where(eq(comment.userId, userId));
      for (const comment of comments) {
        const commentmedia = await db
          .delete(commentMedia)
          .where(eq(commentMedia.commentId, comment.id))
          .returning({ path: commentMedia.imagePath });
        for (const path of commentmedia) {
          const oldImagePath = join(process.cwd(), "public", path.path);
          if (fs.existsSync(oldImagePath)) {
            await fs.unlinkSync(oldImagePath);
          }
        }
      }
    } catch (e) {
      console.error("Error while trying to delete commentmedia\n", e);
    }
    try {
      await db.delete(comment).where(eq(comment.userId, userId));
    } catch (e) {
      console.error("Error while trying to delete comments\n", e);
    }
    try {
      await db.delete(post).where(eq(post.userId, userId));
    } catch (e) {
      console.error("Error while trying to delete posts\n", e);
    }
    await db.delete(user).where(eq(user.id, userId));
    return NextResponse.json({ message: "user deleted" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
