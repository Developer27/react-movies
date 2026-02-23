import * as z from 'zod';

export const SignupFormSchema = z.object({
  username: z.string()
        .min(3, {error: "Username must be at least 3 characters long."})
        .trim(),
  email: z.email({error: "Please enter a valid email."}),
  password: z.string()
            .min(8, {error: "Password must be at least 8 characters long."})
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
              error: 'Contain at least one special character.',
            })
            .trim()
})

export const SigninFormSchema = z.object({
  email: z.email({error: "Please enter a valid email."}),
  password: z.string()
            .min(8, {error: "Password must be at least 8 characters long."})
            .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
            .regex(/[0-9]/, { error: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
              error: 'Contain at least one special character.',
            })
<<<<<<< HEAD
            .trim() 
=======
            .trim()
>>>>>>> 9674d422e4d34f830f636f0a796a6ebb33158e59
})

export type FormState = | {
  errors?: {
    username?: string[],
    email?: string[],
    password?: string[]
  }
  message?: string
}
| undefined