"use client";
import { MovieData } from "@/app/types";
import { fetcher } from "@/utils/requests";
import React, { useState } from "react";
import { ImageWithFallback } from "./image";
import { useSwipeable } from "react-swipeable";
import { PlayIcon, StarIcon } from "@heroicons/react/16/solid";
import useSWR from "swr";

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: movies, error } = useSWR<MovieData[]>(
    "/box-office-movies",
    fetcher,
    { suspense: true }
  );

  if (!movies) {
    return <></>;
  }

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex(currentIndex == movies.length - 1 ? 0 : currentIndex + 1),
    onSwipedRight: () =>
      setCurrentIndex(currentIndex == 0 ? movies.length - 1 : currentIndex - 1),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div {...handlers} className=" w-full h-screen ">
      <div className="relative w-full h-full">
        <div
          className="relative w-full h-full overflow-hidden  max-sm:bg-none "
          style={{
            background: `url(${movies[currentIndex]?.cover_img_url})  no-repeat center center / cover `,
            // backgroundPosition: "center",
            // backgroundSize: "cover",
          }}
        >
          {movies.map((slide, index) => (
            <div
              key={index}
              className={`absolute flex gap-4 w-full h-full transition-transform duration-500 ease-in-out
            
                bg-gradient-to-b from-[rgb(0_0_0/.87)] to-[rgba(0,0,0,.54)]
                backdrop-blur-md
                md:p-8
                ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
            >
              <div className="max-sm:w-full max-sm:h-full w-[25%] h-[80%] relative md:rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src={slide.cover_img_url}
                  alt={`${slide.Title} cover`}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  fill
                />
              </div>
              <div className="max-sm:hidden w-[70%] h-[70%] flex flex-col p-[10px] justify-center ">
                <h2 className="text-white text-6xl">{slide.Title}</h2>
                {slide.rating && (
                  <div className=" flex">
                    <StarIcon className="h-5 w-5 mr-3 text-yellow-300" />
                    <p className="text-white"> {slide.rating}</p>
                  </div>
                )}
              </div>

              <div className="hidden absolute max-sm:flex items-center justify-center bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-neutral-700 text-black p-4 text-center">
                <button className="bg-white rounded-md px-2 py-2 w-[300px] shadow-sm hover:bg-opacity-50 flex items-center justify-center text-center">
                  <PlayIcon className="h-3 w-3 mr-2" />
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:bottom-0 absolute left-1/2 -translate-x-1/2 flex p-3.5">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1  hover:bg-gray-800 ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {error && <h1>Error Occured : {error.message}</h1>}
    </div>
  );
};
