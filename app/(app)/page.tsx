"";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import AnimeItem from "@/components/AnimeItem";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/signin");

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      {/* Hello {session.user?.name || session.user?.email} */}
      <AnimeItem />
    </div>
  );
}
