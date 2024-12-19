"use client";
import { fetchRecent, fetchBoxOffice } from "@/utils/requests";
import { Suspense } from "react";
import { MovieList } from "./movie_list";

export const Lists = () => {
  return (
    <>
      <Suspense>
        <MovieList title="Recent Movies" fetchFunction={fetchRecent} />
      </Suspense>
      <Suspense>
        <MovieList title="Box Office" fetchFunction={fetchBoxOffice} />
      </Suspense>
    </>
  );
};
