import Link from "next/link";
import React from "react";

function page() {
  return (
    <form className="flex flex-col">
      <h2 className="text-3xl font-semibold pb-2">Sign up</h2>
      <div className="flex flex-col gap-2 pb-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Passowrd</label>
        <input type="password" id="password" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="rPassword">Repeat Password</label>
        <input type="password" id="rPassword" />
      </div>

      <Link href={"/Signin"} className="text-sm underline">
        Already have an account? Sign in
      </Link>
    </form>
  );
}

export default page;
