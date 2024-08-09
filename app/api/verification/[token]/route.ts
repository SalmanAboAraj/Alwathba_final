import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};

export const GET = async (request: NextRequest, res: NextResponse) => {
  const token = request.nextUrl.pathname.split("/").pop() as string;
  try {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.verificationToken, token))
      .then(takeUniqueOrThrow);
    const verificationTokenCreationAt =
      userData.verificationTokenCreationAt as Date;
    const expired =
      verificationTokenCreationAt < new Date(Date.now() - 1000 * 60 * 10);

    if (!expired) {
      await db
        .update(user)
        .set({ verificated: true })
        .where(eq(user.verificationToken, token));
      return NextResponse.redirect(process.env.NEXTAUTH_URL + "/verification", {
        status: 307,
      });
    } else {
      return new Response("Password reset token is invalid or has expired.", {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
