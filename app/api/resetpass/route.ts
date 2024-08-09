import { NextRequest, NextResponse } from "next/server";
// import dbConnect from '@/lib/dbConnect'
// import UserModel from '@/lib/models/UserModel'
import { sendPasswordResetEmail } from "@/lib/mail";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
export const POST = async (request: NextRequest) => {
  const email = await request.json();
  console.log(email);
  try {
    const userreq = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .then(takeUniqueOrThrow);
    const passwordResetToken = uuidv4();
    userreq.resetPasswordToken = passwordResetToken;
    userreq.tokenCreatedAt = new Date();
    await db.update(user).set(userreq).where(eq(user.email, email));
    await sendPasswordResetEmail(email, passwordResetToken);
    if (userreq) {
      return new Response(
        JSON.stringify({
          message: "A password reset link has been sent to your email.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      // Respond with a generic message whether or not the email was found
      // This is a security measure to prevent email enumeration
      return new Response(
        JSON.stringify({
          message:
            "If the email is associated with an account, a password reset link will be sent.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message:
          "If the email is associated with an account, a password reset link will be sent.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
