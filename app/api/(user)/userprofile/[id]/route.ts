import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { hashSync } from "bcrypt-ts";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //return user and image from users table and usermedia table
    const userId = parseInt(params.id, 10);
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .then(takeUniqueOrThrow);
    // return current field from userRecord not all fields

    return NextResponse.json({
      id: userRecord.id,
      Fname: userRecord.Fname,
      Lname: userRecord.Lname,
      gender: userRecord.gender,
      email: userRecord.email,
      mobile: userRecord.mobile,
    });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// update user information using post request
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    const body = await request.json();
    // if bode contains a field password then hash it
    if (body.password) {
      body.password = await hashSync(body.password, 10);
    }
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .then(takeUniqueOrThrow);
    // update user information
    const newuser = { ...userRecord, ...body };
    await db
      .update(user)
      .set({
        Fname: newuser.Fname,
        Lname: newuser.Lname,
        email: newuser.email,
        mobile: newuser.mobile,
        password: newuser.password,
      })
      .where(eq(user.id, userId));

    return NextResponse.json({ message: "User updated successfully" });
  } catch (e) {
    console.error("Error while trying to update user information\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
