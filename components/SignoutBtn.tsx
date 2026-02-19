"use client";
import { signOut } from "next-auth/react";

function SignoutBtn() {
  return (
    <button
      onClick={() => signOut()}
      className="border text-white rounded-md bg-amber-700 py-2 px-4 hover:cursor-pointer"
    >
      Sign out
    </button>
  );
}

export default SignoutBtn;
