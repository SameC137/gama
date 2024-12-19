import { MovieData } from "@/app/types";
import React from "react";
import { ImageWithFallback } from "./image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { BlurredButton } from "./blured_button";

export const MovieCard: React.FC<{ movie: MovieData }> = ({ movie }) => {
  return (
    <div className=" w-[150px]  h-[230px] shrink-0 rounded-[14px] overflow-hidden">
      <div className=" w-full h-full relative ">
        <ImageWithFallback
          src={movie.cover_img_url}
          alt={`${movie.Title} cover`}
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          fill
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex ">
          <BlurredButton style={"p-4"}>
            <PlayIcon className="h-6 w-6 text-white" />
          </BlurredButton>
        </div>
        <div className="max-sm:hidden  absolute bottom-0 left-1/2 -translate-x-1/2  w-full flex items-center justify-center  ">
          <p className="text-sm">{movie.Title}</p>
        </div>
      </div>
    </div>
  );
};
