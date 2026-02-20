import { auth, signIn } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { executeAction } from "@/app/lib/executeAction";
import GitHubSignin from "@/components/GitHubSignin";

import Link from "next/link";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

  const users = await prisma.user.findMany()
  console.log(users)

  return (
    <div className="w-1/3 border rounded-md p-6 flex flex-col">
      <form
        action={async (formData: FormData) => {
          "use server";
          await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
        }}
        className="flex flex-col  "
      >
        <h2 className="text-4xl font-semibold pb-6 self-center">Sign in</h2>
        <div className="flex flex-col gap-1 pb-2">
          <label htmlFor="email" className="text-sm w-fit">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
          />
        </div>
        <div className="flex flex-col gap-1 pb-2">
          <label htmlFor="password" className="text-sm w-fit">
            Passowrd
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
          />
        </div>
        <button
          type="submit"
          className="border rounded-md w-2/3 self-center mt-5 hover:cursor-pointer mb-3"
        >
          Sign in
        </button>
      </form>

      <GitHubSignin />

      <Link href={"/signup"} className="text-sm underline self-center pt-5">
        Don&apos;t have account? Sign up
      </Link>
    </div>
  );
}

export default SignIn;
