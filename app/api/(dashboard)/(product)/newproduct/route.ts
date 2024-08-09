import { db } from "@/server/db";
import { productClassification, productMedia } from "@/server/db/schema";
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
    const productRow = {
      productId: formData.get("productId") as unknown as number,
      classificationId: formData.get("classificationId") as unknown as number,
      sizeId: formData.get("sizeId") as unknown as number,
    };

    const newProduct = await db
      .insert(productClassification)
      .values(productRow)
      .returning({ id: productClassification.id })
      .then(takeUniqueOrThrow);

    if (formData.get("imagePath")) {
      const image = formData.get("imagePath") as File;
      const buffer = Buffer.from(await image.arrayBuffer());
      const now = new Date();
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const relativeUploadDir = `/productmedia/${formattedDate.replace(/[\/\\]/g, "-")}`;

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

      const productMediaRow = {
        productId: productRow.productId,
        imagePath: fileUrl,
      };
      await db.insert(productMedia).values(productMediaRow);
    }
    return NextResponse.json({ message: "proudect created successfully" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
