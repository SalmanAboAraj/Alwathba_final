import { db } from "@/server/db";
import { match, post } from "@/server/db/schema";
import { NextResponse } from "next/server";
import { desc, asc } from "drizzle-orm";

export async function GET() {
  try {
    const posts = await db.query.post.findMany({
      with: {
        user: true,
        media: true,
      },
      orderBy: [desc(post.priority), desc(post.postDate), desc(post.postTime)],
    });

    return NextResponse.json(posts);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
