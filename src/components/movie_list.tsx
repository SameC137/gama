"use client";
import React, { useEffect, useState } from "react";
import { MovieCard } from "./movie_card";
import { MovieData } from "@/app/types";
import { AxiosResponse } from "axios";
import { ErrorMessage, handleErrors, isError } from "@/utils/requests";
import { Skeleton } from "./skeleton";

export const MovieList = ({
  title,
  fetchFunction,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFunction: () => Promise<AxiosResponse<any, any>>;
}) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [error, setError] = useState<ErrorMessage>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await handleErrors(fetchFunction);
    if (isError(response)) {
      setError(error);
      console.log(error);
      setLoading(false);
      return;
    }
    const data = (response as AxiosResponse).data;
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full overflow-hidden">
        <h2 className="p-2">{title}</h2>
        <div className="flex gap-x-4 w-full overflow-x-auto box-border p-2">
          <div className=" w-[150px]  h-[230px] shrink-0 rounded-[14px] overflow-hidden">
            <Skeleton height="h-full" width=" w-full" />
          </div>

          <div className=" w-[150px]  h-[230px] shrink-0 rounded-[14px] overflow-hidden">
            <Skeleton height="h-full" width=" w-full" />
          </div>
          <div className=" w-[150px]  h-[230px] shrink-0 rounded-[14px] overflow-hidden">
            <Skeleton height="h-full" width=" w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <h2 className="p-2">{title}</h2>
      <div className="flex gap-x-4 w-full overflow-x-auto box-border p-2">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};
