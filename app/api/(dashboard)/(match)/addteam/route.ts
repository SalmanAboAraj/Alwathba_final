import { db } from "@/server/db";
import { team } from "@/server/db/schema";
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
    const teamRow = {
      name: formData.get("name") as string,
    };

    if (formData.get("logoPath")) {
      const image = formData.get("logoPath") as File;
      const buffer = Buffer.from(await image.arrayBuffer());
      const now = new Date();
      const relativeUploadDir = `/logoteam`;

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

      const newteamRow = {
        name: teamRow.name,
        logoPath: fileUrl,
      };

      await db.insert(team).values(newteamRow);
      return NextResponse.json({ message: "team created successfully" });
    }
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
