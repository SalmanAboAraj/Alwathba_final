import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.query.product.findMany({
      with: {
        productClassification: true,
        productMedia: true,
      },
    });

    return NextResponse.json(products);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
