import { db } from "@/server/db";
import { userMedia } from "@/server/db/schema";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length === 1) {
    return values[0]!;
  }
};

// return imagepath from userMedia table using get
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    const userMediaRow = await db
      .select({ imagePath: userMedia.imagePath })
      .from(userMedia)
      .where(eq(userMedia.userId, userId))
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();
  const file = formData.get("imagePath") as Blob;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
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

    const userId = parseInt(params.id, 10);
    const userMediaRow = {
      userId: userId,
      imagePath: (result as any).secure_url,
    };

    // if userMediaRow.userId there is in userMedia table, update fileUrlnd delete the old image from server file else insert new userMediaRow
    const oldUserMediaRow = await db
      .select()
      .from(userMedia)
      .where(eq(userMedia.userId, userMediaRow.userId));

    if (oldUserMediaRow[0]) {
      await db
        .update(userMedia)
        .set({ imagePath: (result as any).secure_url })
        .where(eq(userMedia.userId, userMediaRow.userId));
    } else {
      await db.insert(userMedia).values(userMediaRow);
    }
    return NextResponse.json({ message: "image updated successfully" });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
