import { MovieData } from "@/app/types";
import React from "react";
import { ImageWithFallback } from "./image";
import { PlayCircleIcon } from "lucide-react";

export const MovieCard: React.FC<{ movie: MovieData }> = ({ movie }) => {
  return (
    <div
      className=" w-1/4 h-full shrink-0 basis-[30%]"
      //  className="w-[144px]  h-[200px] rounded-[14px]"
    >
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex p-3.5">
          <PlayCircleIcon className="" />
        </div>
      </div>
    </div>
  );
};
