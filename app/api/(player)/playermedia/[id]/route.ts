import { db } from "@/server/db";
import { player, userMedia } from "@/server/db/schema";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import fs from "fs";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

// return imagepath from userMedia table using get
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const playerId = parseInt(params.id, 10);
    const userRecord = await db
      .select()
      .from(player)
      .where(eq(player.id, playerId))
      .then(takeUniqueOrThrow);

    const userMediaRow = await db
      .select({ imagePath: userMedia.imagePath })
      .from(userMedia)
      .where(eq(userMedia.userId, userRecord.userId));

    //return only imagepath from userMediaRow array
    return NextResponse.json({ userMediaRow });
  } catch (e) {
    console.error("Error while trying to get userMedia\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const formData = await req.formData();
  const image = formData.get("imagePath") as File;
  const buffer = Buffer.from(await image.arrayBuffer());
  const now = new Date();
  const formattedDate = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const relativeUploadDir = `/playermedia/${formattedDate.replace(/[\/\\]/g, "-")}`;

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
    const playerId = parseInt(params.id, 10);
    const userRow = await db
      .select()
      .from(player)
      .where(eq(player.id, playerId))
      .then(takeUniqueOrThrow);
    const userId = userRow.userId;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      "",
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;
    const userMediaRow = {
      userId: userId,
      imagePath: fileUrl,
    };

    await db.insert(userMedia).values(userMediaRow);

    return NextResponse.json({ message: "File uploaded successfully." });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
