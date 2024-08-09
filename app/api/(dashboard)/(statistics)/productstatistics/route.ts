import { db } from "@/server/db";
import { product } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db
      .select({ name: product.name, quantity: product.quantity })
      .from(product);
    return NextResponse.json(products);
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
