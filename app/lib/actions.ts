import prisma from "./db";
import { executeAction } from "./executeAction"
import { SignupFormSchema } from "./schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get('email');
      const password = formData.get('password');
      const userName = formData.get('username');
      const validatedData = SignupFormSchema.parse({email, password, userName});

      await prisma.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          username: validatedData.username,
          password: validatedData.password
        }
      })
    }
  })
}

export { signUp }