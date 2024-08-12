import { db } from "@/server/db";
import { comment, commentMedia, post, postMedia } from "@/server/db/schema";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import { v2 as cloudinary } from "cloudinary";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  try {
    const postRow = {
      userId: formData.get("userId") as unknown as number,
      content: formData.get("content") as string,
      priority: formData.get("priority") as unknown as number,
    };
    const newpost = await db
      .insert(post)
      .values(postRow)
      .returning({ id: post.id })
      .then(takeUniqueOrThrow);
    //test if imagepath is present
    if (formData.get("imagePath")) {
      const file = formData.get("imagePath") as Blob;

      if (!file) {
        return NextResponse.json(
          { message: "No file uploaded" },
          { status: 400 }
        );
      }
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
              if (error) {
                reject(new Error(error.message));
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        });

        const newId = newpost;
        const postMediaRow = {
          postId: newId.id,
          imagePath: (result as any).secure_url,
        };
        await db.insert(postMedia).values(postMediaRow);
      } catch (e) {
        console.error("Error while trying to update post image\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
      return NextResponse.json({ message: "Post created successfully" });
    }
  } catch (e) {
    console.error("Error while trying to create post\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
