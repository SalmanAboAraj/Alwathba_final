import { db } from "@/server/db";
import { comment, commentMedia } from "@/server/db/schema";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const formData = await request.formData();
  const image = formData.get("imagePath") as File;
  const buffer = Buffer.from(await image.arrayBuffer());
  const now = new Date();
  const formattedDate = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const relativeUploadDir = `/commentmedia/${formattedDate.replace(/[\/\\]/g, "-")}`;

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
  try {
    const postId = parseInt(params.id, 10);

    const commentRow = {
      userId: formData.get("userId") as unknown as number,
      postId: postId,
      content: formData.get("content") as string,
    };
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      "",
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    const newcomment = await db
      .insert(comment)
      .values(commentRow)
      .returning({ id: comment.id })
      .then(takeUniqueOrThrow);
    const newId = newcomment;
    const commentMediaRow = {
      commentId: newId.id,
      imagePath: fileUrl,
    };
    await db.insert(commentMedia).values(commentMediaRow);
    return NextResponse.json({ message: "Comment created successfully" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
