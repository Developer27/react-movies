import AnimeContainer from "@/components/AnimeContainer";

type PagePropsType = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

async function Page({ searchParams }: PagePropsType) {
  const { q = "", page = "1" } = await searchParams;

  const res = await fetch(
    `https://api.jikan.moe/v4/anime?q=${q}&page=${page}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  const fetchedData = data.data;
  const paginationData = data.pagination;

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {/* Hello {session.user?.name || session.user?.email} */}

      <AnimeContainer data={fetchedData} paginationData={paginationData} />

      {/* <AnimeItem /> */}
    </div>
  );
}

export default Page;
