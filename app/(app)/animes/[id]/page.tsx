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
    <>
      <Breadcrumbs currentLabel={anime.title} />
      <AnimeItem anime={anime} />
    </>
  );
}