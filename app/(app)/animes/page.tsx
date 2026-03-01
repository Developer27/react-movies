import AnimeContainer from "@/components/AnimeContainer";
import Breadcrumbs from "@/components/Breadcrumbs";


async function page() {
  const res = await fetch("https://api.jikan.moe/v4/anime");
  const data = await res.json();
  const fetchedData = data.data;

  return (
    <div className="w-full flex justify-center items-center">
      {/* Hello {session.user?.name || session.user?.email} */}
      <AnimeContainer data={fetchedData} />
      <Breadcrumbs/>
      {/* <AnimeItem /> */}
    </div>
  );
}

export default page;
