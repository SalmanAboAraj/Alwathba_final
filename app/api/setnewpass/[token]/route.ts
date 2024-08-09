import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { hashSync } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.nextUrl.pathname.split("/").pop() as string;
  try {
    const newpass = await request.json();
    await db
      .update(user)
      .set({ password: hashSync(newpass.password, 10) })
      .where(eq(user.resetPasswordToken, token));
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login", {
      status: 307,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error creating account" });
  }
}
