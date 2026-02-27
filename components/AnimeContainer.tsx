import {
  AiredType,
  AnimeItemType,
  GenreType,
  ImagesType,
  StudiosType,
  ThemeType,
} from "@/app/lib/types/types";
import AnimeItem from "./AnimeItem";
import AnimeCard from "./AnimeCard";

type AnimeContainerType = {
  data: AnimeItemType[];
};

function AnimeContainer({ data }: AnimeContainerType) {
  console.log(data);

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-[850px] grid grid-cols-5 gap-y-5 border border-black place-items-center py-2">
      {data.map((item) => {
        return <AnimeCard key={item.mal_id} data={item} />;
      })}
    </div>
  );
}

export default AnimeContainer;
