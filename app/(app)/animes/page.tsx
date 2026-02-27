import AnimeContainer from "@/components/AnimeContainer";

async function page() {
  const res = await fetch("https://api.jikan.moe/v4/anime");
  const data = await res.json();
  const fetchedData = data.data;

  return (
    <div className="w-full flex justify-center items-center">
      {/* Hello {session.user?.name || session.user?.email} */}
      <AnimeContainer data={fetchedData} />
      {/* <AnimeItem /> */}
    </div>
  );
}

export default page;
