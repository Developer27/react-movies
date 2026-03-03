"use client";
import {
  AnimeArrType,
  ImagesType,
  MangaArrType,
  VoiceType,
} from "@/app/lib/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import FeaturedInSlider from "./FeaturedInSlider";
import VoiceActorsSlider from "./VoiceACtorsSlider";

type MainCharacterModalType = {
  id: number;
  onClose: () => void;
};

type MainCharacterType = {
  mal_id: number;
  name: string;
  name_kanji: string;
  about: string;
  images: ImagesType;
  anime: AnimeArrType[];
  manga: MangaArrType[];
  voices: VoiceType[];
  nicknames: string[];
};

type CharacterPuctureType = {
  jpg: { image_url: string };
};

function MainCharacterModal({ id, onClose }: MainCharacterModalType) {
  const [characterData, setCharacterData] = useState<MainCharacterType | null>(
    null,
  );
  const [characterPictures, setCharacterPictures] = useState<
    CharacterPuctureType[] | null
  >(null);
  const [showFullBio, setShowFullBio] = useState(false);

  async function getData() {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/characters/${id}/pictures`,
      );
      const data = await res.json();
      setCharacterPictures(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCharData() {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
      const data = await res.json();
      setCharacterData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCharData();
    getData();
  }, []);

  if (!characterData) {
    return null;
    // return (
    //   <div className="bg-black opacity-50 w-full h-full absoulte top-0 left-0 z-100 flex items-center justify-center">
    //     <div className="flex items-center justify-center w-fit">
    //       <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    //     </div>
    //   </div>
    // );
  }
  if (!characterPictures) {
    return <p>loading</p>;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative z-10 w-2/3 mt-10 mb-10 max-h-[90vh] bg-white rounded-md px-5 py-7 flex flex-col overflow-y-auto no-scrollbar">
        <div
          className="absolute flex items-center justify-center w-[20px] h-[20px] top-3 right-3 hover:cursor-pointer duration-200 ease-in-out hover:rotate-90 active:scale-90 active:opacity-60"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <p className="text-2xl text-blue-950 font-semibold pb-2">
          {characterData.name} / {characterData.name_kanji}
        </p>
        <div className="flex gap-2 w-full">
          <Image
            src={characterData.images.jpg.image_url}
            alt="character_image"
            width={250}
            height={250}
          />
          <div>
            <div className="text-sm flex flex-col gap-2 pb-2">
              <div className="flex gap-2">
                <p>Nicknames: </p>
                {characterData.nicknames.map((nickname, index) => {
                  return <p key={index}>{nickname}</p>;
                })}
              </div>
              <p>English name: {characterData.name}</p>
              <p>Japanese name: {characterData.name_kanji}</p>
            </div>
            <div className="flex gap-2">
              {characterPictures.map((item, index) => {
                return (
                  <div key={index} className="w-[150px] h-[200px] relative">
                    <Image
                      src={item.jpg.image_url}
                      alt="character_img"
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <h2 className="text-2xl text-blue-950 font-semibold">Voices:</h2>
            <div className="flex flex-col h-fit pt-3 pl-2">
              <VoiceActorsSlider data={characterData.voices} />
            </div>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-2xl text-blue-950 font-semibold pt-3">Bio:</h2>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out  ${
              showFullBio
                ? "max-h-[600px] opacity-100"
                : "max-h-[120px] opacity-80"
            }`}
          >
            <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
              {characterData.about}
            </p>
          </div>

          {!showFullBio && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
        <button
          className="mt-1 w-fit text-sm font-semibold text-blue-700 hover:underline hover:cursor-pointer"
          onClick={() => setShowFullBio((prev) => !prev)}
        >
          {showFullBio ? "Hide..." : "Show more..."}
        </button>
        <div className="pt-3">
          <p className="pb-2 text-blue-950 font-semibold">Featured in Anime:</p>
          <FeaturedInSlider data={characterData.anime} />
          <p className="pb-2 text-blue-950 font-semibold">
            Featured it Manga:{" "}
          </p>
          <div className="flex gap-2">
            <FeaturedInSlider data={characterData.manga} />
            {/* {characterData.manga.map((item) => {
              return (
                <div
                  key={item.manga.mal_id}
                  className="flex flex-col w-[150px]"
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
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCharacterModal;
