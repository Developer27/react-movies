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

type MainCharacterModalType = {
  id: number;
  onClose: () => void;
};

type MainCharacterType = {
  mal_id: number;
  name: string;
  about: string;
  images: ImagesType;
  anime: AnimeArrType[];
  manga: MangaArrType[];
  voices: VoiceType[];
};

function MainCharacterModal({ id, onClose }: MainCharacterModalType) {
  const [characterData, setCharacterData] = useState<MainCharacterType | null>(
    null,
  );
  const [showFullBio, setShowFullBio] = useState(false);

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
    return null;
    // return (
    //   <div className="bg-black opacity-50 w-full h-full absoulte top-0 left-0 z-100 flex items-center justify-center">
    //     <div className="flex items-center justify-center w-fit">
    //       <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    //     </div>
    //   </div>
    // );
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
          {characterData.name}
        </p>
        <div className="flex gap-2 w-full">
          <Image
            src={characterData.images.jpg.image_url}
            alt="character_image"
            width={250}
            height={250}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl text-blue-950 font-semibold">Voices:</h2>

            <div
              className={`flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out w-full `}
            >
              <div className="relative w-[220px]">
                <div
                  className={`grid grid-cols-2 pb-6 gap-2 overflow-y-auto overflow-x-hidden transition-[max-height] duration-300 ease-in-out max-h-[420px]`}
                >
                  {characterData.voices.map((item) => (
                    <div
                      key={item.person.mal_id}
                      className="flex flex-col items-center gap-1 h-fit"
                    >
                      <Image
                        src={item.person.images.jpg.image_url}
                        alt={item.person.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <p className="text-sm text-center font-medium">
                        {item.person.name}
                      </p>
                      <p className="text-xs text-gray-500 ">{item.language}</p>
                    </div>
                  ))}
                </div>

                {/* {!showAll && (
                  <div className="pointer-events-none absolute bottom-0 left-0 h-15 w-full bg-gradient-to-t from-white to-transparent" />
                )} */}
              </div>
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
