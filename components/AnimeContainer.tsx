import { AnimeItemType, PaginationDataType } from "@/app/lib/types/types";
import AnimeCard from "./AnimeCard";
import Pagination from "./Pagination";
import Breadcrumbs from "./Breadcrumbs";

type AnimeContainerType = {
  data: AnimeItemType[];
  paginationData: PaginationDataType;
};

function AnimeContainer({ data, paginationData }: AnimeContainerType) {
  console.log("dataaaaa", paginationData);

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Breadcrumbs />
      <Pagination paginationData={paginationData} />
      <div className="w-[850px] grid grid-cols-5 gap-y-5 border border-black place-items-center py-2 mt-2">
        {data.map((item) => {
          return <AnimeCard key={item.mal_id} data={item} />;
        })}
      </div>
      <Pagination paginationData={paginationData} styles="pt-2 pb-5" />
    </div>
  );
}

export default AnimeContainer;
