"use client";
import React from "react";
import { MovieCard } from "./movie_card";
import { fetcher } from "@/utils/requests";
import useSWR from "swr";
import { MovieData } from "@/app/types";

export const MovieList = ({
  title,
  dataPoint,
}: {
  title: string;
  dataPoint: string;
}) => {
  const { data: movies, error } = useSWR<MovieData[]>(dataPoint, fetcher, {
    suspense: true,
    fallbackData: [],
  });

  if (error) {
    throw error;
  }

  if (!movies) {
    return <></>;
  }

  return (
    <div className="w-full overflow-hidden md:flex justify-center">
      <div className=" md:w-[500px]">
        <h2 className="p-2">{title}</h2>
        <div className="flex gap-x-4 w-full overflow-x-auto box-border p-2 no-scrollbar">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
