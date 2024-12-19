"use client";
import { MovieData } from "@/app/types";
import { searchMovies } from "@/utils/requests";
import React, { useState } from "react";
import debounce from "lodash.debounce";
import {
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchScreenActive, setSearchScreenActive] = useState(false);

  const [searchResults, setSearchResults] = useState<MovieData[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await searchMovies(query);
      const data: MovieData[] = response.data;
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  const debouncedSearch = debounce(handleSearch, 1000);

  return (
    <>
      <MagnifyingGlassIcon
        className="h-6 w-6"
        onClick={() => setSearchScreenActive(true)}
      />
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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                debouncedSearch(e.target.value);
              }}
              className="w-full bg-neutral-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grey-500"
            />
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-[10px]">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="flex gap-[10px] bg-neutral-800 backdrop-blur-[30px] p-2 rounded-[10px]"
              >
                <img
                  src={result.cover_img_url}
                  alt={result.Title}
                  className="w-24 h-32 rounded-lg"
                />
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