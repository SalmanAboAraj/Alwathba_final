import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { hashSync } from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const newuser = await request.json();
    const verificationToken = uuidv4();
    await db.insert(user).values({
      ...newuser,
      password: await hashSync(newuser.password, 10),
      resetPasswordToken: null,
      tokenCreatedAt: null,
      verificationToken: verificationToken,
      verificationTokenCreationAt: new Date(),
    });
    sendVerificationEmail(newuser.email, verificationToken);
    return new Response(
      JSON.stringify({
        message: "A password reset link has been sent to your email.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error creating account" });
  }
}
