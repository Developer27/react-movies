import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import prisma from "./db"
import { SignupFormSchema } from "./schema"




export const { auth, handlers, signIn } = NextAuth({ providers: [GitHub, Credentials({
  credentials: {
    email: {},
    password: {}
  },
  
  authorize: async (credentials) => {
  

    const validatedCredentials = SignupFormSchema.parse(credentials);

    const email = validatedCredentials.email as string
    const password = validatedCredentials.password as string
  
    const user = await prisma.user.findUnique({ where: { email }, })
    if(!user) {
      throw new Error("Invalid credentials.");
    }
    return {
      id: user.id.toString(),
      email: user.email,
      userName: user.username
    };
  }
})] }) 