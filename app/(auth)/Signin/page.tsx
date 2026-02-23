import { auth } from "@/app/lib/auth";
import SigninForm from "@/app/(auth)/signin/_signinForm/SignInForm";

import GitHubSignin from "@/components/GitHubSignin";

import Link from "next/link";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-1/3 border rounded-md p-6 flex flex-col">
      <SigninForm />
      <GitHubSignin />

      <Link href={"/signup"} className="text-sm underline self-center pt-5">
        Don&apos;t have account? Sign up
      </Link>
    </div>
  );
}

export default SignIn;
