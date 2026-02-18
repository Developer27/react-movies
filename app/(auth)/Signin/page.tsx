import { signIn } from "@/app/lib/auth";
import Link from "next/link";


function SignIn() {
  return (
    <form action={async () => {
      "use server"
      await signIn('github');
    }} className="flex flex-col w-1/3 border p-6 rounded-md">
      <h2 className="text-4xl font-semibold pb-6 self-center">Sign in</h2>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">Email</label>
        <input
          type="email"
          id="email"
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="password" className="text-sm w-fit">Passowrd</label>
        <input type="password" id="password" 
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"/>
      </div>
      <button className="border bg-black p-2 text-white rounded-md">Github</button>

      <Link href={"/signup"} className="text-sm underline self-center pt-5">
        Don&apos;t have account? Sign up
      </Link>
    </form>
  );
}

export default SignIn;
