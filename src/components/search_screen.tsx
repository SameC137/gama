"use client";
import { APIError, MovieData } from "@/app/types";
import { fetcher } from "@/utils/requests";
import React, { useState } from "react";
import debounce from "lodash.debounce";
import {
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import useSWR from "swr";
import { ImageWithFallback } from "./image";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchScreenActive, setSearchScreenActive] = useState(false);

  const { data: searchResults, error } = useSWR<MovieData[], APIError>(
    searchTerm ? `/filter-movie?name=${searchTerm}` : null,
    fetcher
  );

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
  };
  const debouncedSearch = debounce(handleSearch, 1000);

  return (
    <>
      <MagnifyingGlassIcon
        className="h-6 w-6 md:hidden"
        onClick={() => setSearchScreenActive(true)}
      />
      <div
        className="hidden md:block relative"
        onClick={() => setSearchScreenActive(true)}
      >
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          title="search"
          placeholder="What do you want to watch?"
          className="w-full bg-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grey-500"
        />
      </div>

      {searchScreenActive && (
        <div
          className={`min-h-screen bg-black/85  text-white p-4  w-screen md:w-[500px] md:min-h-min md:right-8 md:rounded-[10px]  top-0 max-sm:left-0 fixed flex-col z-50`}
        >
          <div className="flex justify-end mb-4">
            <button className="p-2">
              <XMarkIcon
                className="w-6 h-6"
                onClick={() => setSearchScreenActive(false)}
              />
            </button>
          </div>
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              title="search"
              placeholder="Search"
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
              className="w-full bg-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grey-500"
            />
          </div>

          {error && <h2 className="text-white">{error.message}</h2>}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-[10px]">
            {searchResults?.map((result, index) => (
              <div
                key={index}
                className="flex gap-[10px] bg-neutral-800 backdrop-blur-[30px] p-2 rounded-[10px]"
              >
                <div className="w-24 h-32 rounded-lg  overflow-hidden">
                  <ImageWithFallback
                    src={result.cover_img_url}
                    alt={result.Title}
                    width={"96"}
                    height={"128"}
                  />
                </div>
                <div className="flex flex-col p-[10px]">
                  <h2 className="text-white text-lg">{result.Title}</h2>
                  {result.rating && (
                    <div className=" flex">
                      <StarIcon className="h-5 w-5 mr-3 text-yellow-300" />
                      <p className="text-white"> {result.rating}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
