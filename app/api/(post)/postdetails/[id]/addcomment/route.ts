import { db } from "@/server/db";
import { comment, commentMedia } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
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
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await request.formData();
  const postId = parseInt(params.id, 10);

  try {
    const commentRow = {
      userId: formData.get("userId") as unknown as number,
      postId: postId,
      content: formData.get("content") as string,
    };
    const newcomment = await db
      .insert(comment)
      .values(commentRow)
      .returning({ id: comment.id })
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

        const newId = newcomment;
        const commentMediaRow = {
          commentId: newId.id,
          imagePath: (result as any).secure_url,
        };
        await db.insert(commentMedia).values(commentMediaRow);
      } catch (e) {
        console.error("Error while trying to update comment image\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
      return NextResponse.json({ message: "comment created successfully" });
    }
  } catch (e) {
    console.error("Error while trying to create comment\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
