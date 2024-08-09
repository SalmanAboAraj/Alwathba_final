import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { user } from "@/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";

import { randomBytes, randomUUID } from "crypto";
import { compareSync } from "bcrypt-ts";

const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0]!;
};
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      // ...other properties
      roleId: number;
      blocked: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    id: number;
    roleId: number;
    blocked: boolean;
  }
}
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.roleId;
        token.blocked = user.blocked;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.roleId = token.role as number;
        session.user.blocked = token.blocked as boolean;
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = (await credentials?.email) as string;
        try {
          const userauth = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .then(takeUniqueOrThrow);
          if (
            credentials?.email == userauth.email &&
            compareSync(credentials?.password, userauth.password)
          ) {
            return userauth;
          } else {
            console.log(credentials?.password);
            return null;
          }
        } catch (e) {
          console.log("not found user", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const getServerAuthSession = () => getServerSession(authOptions);
