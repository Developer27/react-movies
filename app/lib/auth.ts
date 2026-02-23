import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth} = NextAuth({
  providers: [ 
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({where: {email: credentials.email as string}});

        if(!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(credentials.password as string, user.password as string);

        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
      }
  })],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  }
})