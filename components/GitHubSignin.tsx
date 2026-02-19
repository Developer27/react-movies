"use client";

import { signIn } from "next-auth/react";

export default function GitHubSignin() {
  return (
    <button
      className="border bg-black p-2 text-white rounded-md"
      onClick={() => signIn("github")}
    >
      GitHub
    </button>
  );
}
