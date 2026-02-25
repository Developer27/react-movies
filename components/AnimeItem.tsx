"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "./Rating";
import MainCharacterModal from "./MainCharacterModal";
import { AnimeCharacterImages, ImagesType } from "@/app/lib/types/types";

type ThemeType = {
  mal_id: number;
  name: string;
  url: string;
};

type GenreType = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AiredType = {
  from: string;
  to: string;
};

type StudiosType = {
  mal_id: number;
  name: string;
};

type AnimeItem = {
  mal_id: number;
  url: string;
  images: ImagesType;
  type: string;
  status: string;
  title_english: string;
  title_japanese: string;
  episodes: string;
  score: string;
  source: string;
  rating: string;
  synopsis: string;
  aired: AiredType;
  studios: StudiosType[];
  genres: GenreType[];
  themes: ThemeType[];
};

type AnimeCharacter = {
  mal_id: number;
  name: string;
  url: string;
  images: AnimeCharacterImages;
};

type AnimeCharacterItem = {
  character: AnimeCharacter;
  favorites: number;
  role: string;
};

function AnimeItem() {
  const [animeItem, setAnimeItem] = useState<AnimeItem | null>(null);
  const [animeCharacters, setAnimeCharacters] = useState<
    AnimeCharacterItem[] | null
  >(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null,
  );
  const [isCharModalOpen, setIsCharModelOpen] = useState<boolean>(false);

  async function getData() {
    try {
      const res = await fetch("https://api.jikan.moe/v4/anime");
      const data = await res.json();
      console.log(data);
      setAnimeItem(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function getAnimeCharacters() {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${animeItem?.mal_id}/characters`,
      );
      const data = await res.json();
      console.log(data);
      const filteredData = data.data.filter(
        (item: AnimeCharacterItem) => item.role === "Main",
      );
      setAnimeCharacters(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (animeItem) {
      getAnimeCharacters();
    }
  }, [animeItem]);

  if (!animeItem) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="flex flex-col w-3/4 justify-center items-start">
      <h2 className="font-bold text-3xl pb-5">
        {animeItem.title_english} / {animeItem.title_japanese}
      </h2>
      <div className="flex w-full">
        <div>
          {/* <p>{animeItem?.url}</p> */}
          <div className="h-[389px] w-[261px] relative">
            <Image
              src={animeItem?.images.jpg.large_image_url}
              alt="anime_image"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-md text-gray-500 pt-2 self-center">
            Rating:{" "}
            <span className="bg-orange-500 text-white rounded-sm p-1">
              {animeItem.rating.slice(0, 8)}
            </span>
          </p>
        </div>
        <div className="pl-4 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-blue-950 pb-3">
            Information
          </h2>
          <p className="text-sm text-gray-500">Type: {animeItem.type}</p>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span className="bg-green-600 rounded-sm p-1 text-sm text-white">
              {animeItem.status}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Episodes: {animeItem.episodes}
          </p>

          <p className="text-sm text-gray-500">
            From {new Date(animeItem.aired.from).toLocaleDateString()} To{" "}
            {new Date(animeItem.aired.to).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">Source: {animeItem.source}</p>

          <div className="flex gap-2 text-sm text-gray-500">
            <p>Studios:</p>
            <div className="flex items-center">
              {animeItem.studios.map((item, i) => {
                return (
                  <p key={item.mal_id} className="text-sm">
                    {item.name} {i !== animeItem.studios.length - 1 ? "," : ""}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 text-sm text-gray-500">
            <p>Genres:</p>
            <div className="flex gap-2 items-center">
              {animeItem.genres.map((item, i) => {
                return (
                  <p key={item.mal_id} className="text-sm">
                    {item.name}
                    {i !== animeItem.genres.length - 1 ? "," : ""}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p>themes:</p>
            <ul>
              {animeItem.themes.map((item) => {
                return <li key={item.mal_id}>-{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-blue-950 pb-4">
            Score:{" "}
            <span className="border border-black py-1 px-2 rounded bg-green-600 text-white">
              {animeItem.score}
            </span>
          </div>
          <Rating score={+animeItem.score} />
        </div>
      </div>
      <div className="w-full pt-10">
        <p>{animeItem.synopsis}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-blue-950">
          Main characters
        </h3>

        <div className="flex gap-10">
          {animeCharacters?.map((item) => {
            return (
              <div
                key={item.character.mal_id}
                className="flex flex-col items-center"
                onClick={() => {
                  setSelectedCharacterId(item.character.mal_id);
                  setIsCharModelOpen(true);
                }}
              >
                <Image
                  src={item.character.images.jpg.image_url}
                  alt="character_image"
                  width={150}
                  height={150}
                />
                <p>{item.character.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {isCharModalOpen && selectedCharacterId && (
        <MainCharacterModal
          id={selectedCharacterId}
          onClose={() => setIsCharModelOpen(false)}
        />
      )}
    </div>
  );
}

export default AnimeItem;
