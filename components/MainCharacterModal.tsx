"use client";
import { ImagesType } from "@/app/lib/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type MainCharacterModalType = {
  id: number;
  onClose: () => void;
};

type AnimeType = {
  mal_id: number;
  title: string;
  images: ImagesType;
};

type AnimeArrType = {
  role: string;
  anime: AnimeType;
};

type MangaType = {
  mal_id: number;
  title: string;
  images: ImagesType;
};

type MangaArrType = {
  role: string;
  manga: MangaType;
};

type MainCharacterType = {
  mal_id: number;
  name: string;
  about: string;
  images: ImagesType;
  anime: AnimeArrType[];
  manga: MangaArrType[];
};

function MainCharacterModal({ id, onClose }: MainCharacterModalType) {
  const [characterData, setCharacterData] = useState<MainCharacterType | null>(
    null,
  );

  async function getCharData() {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
      const data = await res.json();
      setCharacterData(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCharData();
  }, []);

  if (!characterData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center">
      <div
        className="bg-black opacity-50 w-full h-full absoulte top-0 left-0"
        onClick={onClose}
      ></div>
      <div className="w-2/3 bg-white rounded-md absolute z-10 px-5 py-7 flex flex-col">
        <p className="text-2xl text-blue-950 font-semibold pb-5 self-center">
          {characterData.name}
        </p>
        <div className="flex gap-2 w-full">
          <Image
            src={characterData.images.jpg.image_url}
            alt="character_image"
            width={250}
            height={250}
          />
        </div>

        <p className="text-sm">{characterData.about}</p>
        <div>
          <p>Featured in Anime:</p>
          <div className="flex gap-2">
            {characterData.anime.map((item) => {
              return (
                <div
                  key={item.anime.mal_id}
                  className="flex flex-col justify-between  items-center"
                >
                  <Image
                    src={item.anime.images.jpg.image_url}
                    alt="anime_image"
                    width={100}
                    height={100}
                  />
                  <p className="text-sm">{item.anime.title}</p>
                </div>
              );
            })}
          </div>
          <p>Featured it Manga: </p>
          <div className="flex gap-2">
            {characterData.manga.map((item) => {
              return (
                <div
                  key={item.manga.mal_id}
                  className="flex flex-col justify-between items-center"
                >
                  <Image
                    src={item.manga.images.jpg.image_url}
                    alt="anime_image"
                    width={100}
                    height={100}
                  />
                  <p className="text-sm">{item.manga.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCharacterModal;
