import { db } from "@/server/db";
import { productClassification, productMedia } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const prodId = parseInt(params.id, 10);
    const product = await db.query.productClassification.findMany({
      with: {
        product: true,
        classification: true,
        size: true,
      },
      where: eq(productClassification.productId, prodId),
    });
    const productImages = await db
      .select()
      .from(productMedia)
      .where(eq(productMedia.productId, prodId));

    return NextResponse.json({ product, productImages });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
