"use client";
import React from "react";
import { MovieCard } from "./movie_card";
import { MovieData } from "@/app/types";

export const MovieList = ({ movies }: { movies: MovieData[] }) => {
  return (
    <div className="flex gap-x-4 h-screen w-screen overflow-x-scroll box-border p-2">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};
