import { db } from "@/server/db";
import { product } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json();
    await db.insert(product).values(newProduct);
    return NextResponse.json({ msg: "product created" });
  } catch (e) {
    console.log(e);
  }
}
