"use client";

import {
  ChevronLeftIcon,
  PauseCircleIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";
import { useState, useRef } from "react";
import { BlurredButton } from "./blured_button";

interface VideoPlayerProps {
  src: string;
  title: string;
  open: boolean;
  onClose: () => any;
}

export default function VideoPlayer({
  src,
  title,
  open,
  onClose,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition =
        (e.clientX - progressBar.getBoundingClientRect().left) /
        progressBar.offsetWidth;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  if (!open) {
    return;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex justify-center items-center">
      <div className="relative w-full h-full md:w-[60%] md:h-[70%] md:rounded-[20px] overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={src}
        />

        <div className="absolute inset-0 ">
          <div className="absolute top-1 left-1 p-4 transform -translate-x -translate-y">
            <BlurredButton
              style={
                "p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              }
              onClick={onClose}
            >
              <ChevronLeftIcon className="h-3 w-3 text-white" />
            </BlurredButton>
          </div>

          {!isPlaying && (
            <BlurredButton
              style={
                "p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              }
              onClick={togglePlay}
            >
              <PlayIcon className="h-6 w-6 text-white" />
            </BlurredButton>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h2 className="text-white text-sm ">{title}</h2>
            <div
              className="relative h-1 bg-white/30 rounded cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="absolute h-full bg-white rounded"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-white text-sm">
              <span className="flex justify-items-center items-center">
                {isPlaying ? (
                  <PauseIcon
                    className="w-4 h-4 text-white mr-1"
                    onClick={togglePlay}
                  />
                ) : (
                  <PlayIcon
                    className="w-4 h-4 text-white mr-1"
                    onClick={togglePlay}
                  />
                )}
                {formatTime(currentTime)}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
