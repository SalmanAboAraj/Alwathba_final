import { db } from "../../../../../server/db";
import { product } from "../../../../../server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db
      .select({ name: product.name,id:product.id })
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


export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json();
    await db.insert(product).values(newProduct);
    return NextResponse.json({ msg: "product created" });
  } catch (e) {
    console.log(e);
  }
}
