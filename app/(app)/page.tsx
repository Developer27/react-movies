import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import AnimeContainer from "@/components/AnimeContainer";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/signin");

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      {/* Hello {session.user?.name || session.user?.email} */}
      <p>Main page</p>
      <Link
        href={"/animes"}
        className="px-4 py-2 border border-rounded bg-blue-800 text-white rounded-md"
      >
        View animes
      </Link>
      {/* <AnimeItem /> */}
    </div>
  );
}
