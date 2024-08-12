import { db } from "@/server/db";
import { productClassification, productMedia } from "@/server/db/schema";
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
        const productMediaRow = {
          productId: productRow.productId,
          imagePath: (result as any).secure_url,
        };
        await db.insert(productMedia).values(productMediaRow);
      } catch (e) {
        console.error("Error while trying to update comment image\n", e);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ message: "proudect created successfully" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
