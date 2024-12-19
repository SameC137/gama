"use client";
import { MovieData } from "@/app/types";
import {
  ErrorMessage,
  fetchBoxOffice,
  handleErrors,
  isError,
} from "@/utils/requests";
import React, { useEffect, useState } from "react";
import { ImageWithFallback } from "./image";
import { AxiosResponse } from "axios";
import { Button } from "./ui/button";
import { useSwipeable } from "react-swipeable";

export const Carousel: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([
    {
      Title: "Inception",
      video_url: "http://example.com/inception",
      cover_img_url:
        "http://gama-test-1.onrender.comhttp://example.com/inception.jpg",
      rating: 8.8,
    },
    {
      Title: "Interstellar",
      video_url: "http://example.com/interstellar",
      cover_img_url:
        "http://gama-test-1.onrender.comhttp://example.com/interstellar.jpg",
      rating: 8.6,
    },
    {
      Title: "The Gentlemen",
      video_url: "http://media.w3.org/2010/05/sintel/trailer.mp4",
      cover_img_url: "http://gama-test-1.onrender.com/public/gentlmen.jpg",
      rating: 9.4,
    },
    {
      Title: "Spy City",
      video_url:
        "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
      cover_img_url: "http://gama-test-1.onrender.com/public/spycity.jpg",
      rating: 4.5,
    },
    {
      Title: "Project Runway",
      video_url: "http://media.w3.org/2010/05/sintel/trailer.mp4",
      cover_img_url: "http://gama-test-1.onrender.com/public/runway.jpg",
      rating: 5.4,
    },
    {
      Title: "Project Greenlight 2",
      video_url:
        "https://www.nlm.nih.gov/web/documentation/TemplateDocumentation/video_files/IN_Intro-800.mp4",
      cover_img_url:
        "http://gama-test-1.onrender.com/public/greenlight_two.jpg",
      rating: 5.6,
    },
  ]);
  const [error, setError] = useState<ErrorMessage>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchDat = async () => {
    const response = await handleErrors(fetchBoxOffice);
    if (isError(response)) {
      setError(error);
      return;
    }
    const data: MovieData[] = (response as AxiosResponse).data.json();
    setMovies(data);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex(currentIndex == movies.length - 1 ? 0 : currentIndex + 1),
    onSwipedRight: () =>
      setCurrentIndex(currentIndex == 0 ? movies.length - 1 : currentIndex - 1),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    fetchDat();
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div {...handlers} className=" w-full h-screen ">
      <div className="relative w-full h-full">
        <div className="relative w-full h-[94%] overflow-hidden">
          {movies.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className=" w-full h-full">
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-neutral-700 text-white p-4 text-center">
                <Button>Watch Now</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex p-3.5">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 bg-gray-300 hover:bg-gray-500 ${
                index === currentIndex ? "bg-gray-700" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      {/* {movies.map((m) => (
        <div key={m.Title}>
          <h1>{m.Title}</h1>
          <h2>{m.rating}</h2>
          <ImageWithFallback
            src={m.cover_img_url}
            alt={`${m.Title} cover`}
            width={500}
            height={600}
          />
        </div>
      ))} */}
      {error && <h1>Error Occured : {error.message}</h1>}
    </div>
  );
};
