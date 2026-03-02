"use client";
import { VoiceType } from "@/app/lib/types/types";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";

type FeaturedInSliderPropsType = {
  data: VoiceType[];
};

function VoiceActorsSlider({ data }: FeaturedInSliderPropsType) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const hideNavigation = data.length <= 5;

  return (
    <div className="relative w-[600px] max-w-[600px]">
      <button
        disabled={isBeginning}
        ref={prevRef}
        className={`${hideNavigation ? "hidden" : ""} absolute -left-4 top-1/2 -translate-y-1/2 z-10
                    w-8 h-8 rounded-full bg-black/70 text-white ${isBeginning ? "opacity-60 pointer-events-none" : ""} flex items-center justify-center hover:cursor-pointer`}
      >
        <ArrowLeft />
      </button>

      <button
        disabled={isEnd}
        ref={nextRef}
        className={`${hideNavigation ? "hidden" : ""} absolute -right-4 top-1/2 -translate-y-1/2 z-10
                    w-8 h-8 rounded-full bg-black/70 text-white ${isEnd ? "opacity-60 pointer-events-none" : ""} flex items-center justify-center hover:cursor-pointer`}
      >
        <ArrowRight />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={4}
        spaceBetween={8}
        loop
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true, // ⏸ пауза при hover
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          if (!swiper.params.navigation) {
            swiper.params.navigation = {};
          }

          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current!;
            swiper.params.navigation.nextEl = nextRef.current!;
          }
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="overflow-hidden"
      >
        {data.map((item) => {
          return (
            <SwiperSlide key={item.person.mal_id} className="!h-fit">
              <div className="flex justify-center items-center">
                <div className="w-[100px] h-[150px] relative">
                  <Image
                    src={item.person.images.jpg.image_url}
                    alt={`${item.person.name}_picture`}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
              <p className="text-sm truncate text-center">{item.person.name}</p>
              <p className="text-sm text-center">Language: {item.language}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default VoiceActorsSlider;
