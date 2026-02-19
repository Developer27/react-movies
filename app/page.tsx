import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import { signOut } from "next-auth/react";
import SignoutBtn from "@/components/SignoutBtn";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/signin");

  return (
    <div className="flex flex-col gap-3">
      Hello {session.user?.name || session.user?.email}
      <SignoutBtn />
    </div>
  );
}
