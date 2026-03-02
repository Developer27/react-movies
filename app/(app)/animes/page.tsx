import AnimeContainer from "@/components/AnimeContainer";
import Breadcrumbs from "@/components/Breadcrumbs";

type PagePropsType = {
  searchParams: { page?: string };
};

async function Page({ searchParams }: PagePropsType) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`, {
    cache: "no-store",
  });
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
