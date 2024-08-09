import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { compareSync } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const userauth = await db
      .select()
      .from(user)
      .where(eq(req.email, user.email));
    if (userauth.length > 0) {
      if (compareSync(req.password, userauth[0]?.password as string)) {
        if (userauth[0]?.verificated === true) {
          if (userauth[0]?.blocked === false) {
            return NextResponse.json({
              msg: "success",
              user: userauth[0].id,
            });
          } else {
            return NextResponse.json({
              msg: "The account has not been blocked",
              user: null,
            });
          }
        } else {
          return NextResponse.json({
            msg: "The account has been verified ",
            user: null,
          });
        }
      } else {
        return NextResponse.json({
          msg: "The password is incorrect",
          user: null,
        });
      }
    } else {
      return NextResponse.json({
        msg: "Account not found",
        user: null,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error to get account" });
  }
}
