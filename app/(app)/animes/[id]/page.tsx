import Breadcrumbs from "@/components/Breadcrumbs";
import AnimeItem from "@/components/AnimeItem";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getAnime(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const json = await res.json();
  return json.data;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const anime = await getAnime(id);

  return (
    <div className="flex flex-col gap-2 w-3/4 justify-center items-center">
      <AnimeItem anime={anime} />
    </div>
  );
}
