import { db } from "@/server/db";
import { admin, userMedia } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminId = parseInt(params.id, 10);
    const adminRecord = await db
      .select()
      .from(admin)
      .where(eq(admin.id, adminId))
      .then(takeUniqueOrThrow);

    const userMediaRow = await db
      .select({ imagePath: userMedia.imagePath })
      .from(userMedia)
      .where(eq(userMedia.userId, adminRecord.userId));

    //return only imagepath from userMediaRow array
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
    const adminId = parseInt(params.id, 10);
    const adminRecord = await db
      .select()
      .from(admin)
      .where(eq(admin.id, adminId))
      .then(takeUniqueOrThrow);
    const userId = adminRecord.userId;
    const userMediaRow = {
      userId: userId,
      imagePath: (result as any).secure_url,
    };

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
    return NextResponse.json({ message: "File uploaded successfully." });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
