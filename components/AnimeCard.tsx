"use client";
import { AnimeItemType } from "@/app/lib/types/types";
import Image from "next/image";
import { redirect } from "next/navigation";

type AnimeCardProps = {
  data: AnimeItemType;
};

function AnimeCard({ data }: AnimeCardProps) {
  console.log("data", data);

  function goToAnimeitem() {
    redirect(`/animes/${data.mal_id}`);
  }

  return (
    <div
      className="group-hover border flex flex-col gap-1 justify-center hover:cursor-pointer w-[150px] max-w-[150px] "
      onClick={goToAnimeitem}
    >
      <div className="relative w-[150px] h-[212px]">
        <Image
          src={data.images.jpg.image_url}
          alt="anime_poster_image"
          fill
          className="object-cover"
        />
      </div>

      <p className="text-sm truncate font-semibold text-blue-950 animated-underline relative">
        {data.title}
      </p>
      <div className="flex items-center justify-between w-full ">
        <p className="text-sm">
          {data.type === "TV" ? data.type + " show" : data.type}
        </p>
        <p className="text-sm">{data.year === null ? "N/A" : data.year}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
