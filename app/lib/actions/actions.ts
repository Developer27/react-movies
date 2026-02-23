import prisma from "../prisma";
import { SignupFormSchema } from "../schema";
import bcrypt from "bcryptjs";

export async function createAccount(formData: FormData) {
  const email = formData.get('email') as string | null;
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;
  const validatedData = SignupFormSchema.parse({email, password, username});

  if(!email || !password || !username) {
    throw new Error("Email, password and username are required.");
  }

  const existingUser = await prisma.user.findUnique({ where: {email : validatedData.email as string}});

  if(existingUser) {
    throw new Error("User with this email already exists.")
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        username: validatedData.username
      }
    })
  } catch(error) {
    console.log("Error creating user", error)
    throw new Error("Error creating user account");
  }
}