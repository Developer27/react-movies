"use client"
import { signup } from "@/app/actions/auth";
import { error } from "console";
import Link from "next/link";
import { useActionState } from "react";


function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

<<<<<<< HEAD
function page() {
  return <></>;
=======
  return (
    <form action={action} className="flex flex-col w-1/3 border p-6 rounded-md">
      <h2 className="text-4xl font-semibold pb-6 self-center">Sign up</h2>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">Username</label>
        <input
          type="text"
          id="username"
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
        {state?.errors?.username && <p>{state.errors.username}</p>}
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">Email</label>
        <input
          type="email"
          id="email"
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="password" className="text-sm w-fit">Passowrd</label>
        <input 
          type="password" 
          id="password" 
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"/>
          {state?.errors?.password && (
            <div>
              <p>Password must: </p>
              <ul>
                {state.errors.password.map((error)=> (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rPassword" className="text-sm w-fit">Repeat Password</label>
        <input 
          type="password" 
          id="rPassword" 
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"/>
      </div>
      <button className="border bg-black p-2 text-white rounded-md mt-2">Github</button>

      <button 
        type="submit" 
        className="border rounded-md w-2/3 self-center mt-5 hover:cursor-pointer"
        disabled={pending}
        >
        Sign up
      </button>

      <Link href={"/signin"} className="text-sm underline self-center pt-5">
        Already have an account? Sign in
      </Link>
    </form>
  );
>>>>>>> 0ac801042c8a32e0208199414b9dcef3b9f266ae
}

export default SignUp;
