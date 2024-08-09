import { db } from "@/server/db";
import { comment, commentMedia, post, postMedia } from "@/server/db/schema";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

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
      .returning({ id: comment.id })
      .then(takeUniqueOrThrow);
    //test if imagepath is present
    if (formData.get("imagePath")) {
      const image = formData.get("imagePath") as File;
      const buffer = Buffer.from(await image.arrayBuffer());
      const now = new Date();
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const relativeUploadDir = `/postmedia/${formattedDate.replace(/[\/\\]/g, "-")}`;

      const uploadDir = join(process.cwd(), "public", relativeUploadDir);

      try {
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e,
          );
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
          );
        }
      }
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        "",
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;

      const newId = newpost;
      const postMediaRow = {
        postId: newId.id,
        imagePath: fileUrl,
      };
      await db.insert(postMedia).values(postMediaRow);
    }
    return NextResponse.json({ message: "Post created successfully" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
