import React from "react";
import { Skeleton } from "./skeleton";

export const MovieListSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
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
};

export const CarouselSkeleton = () => {
  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-full">
        <div className="relative w-full h-[94%] overflow-hidden">
          <Skeleton height={"h-full"} width={"w-full"} />
          <div className="absolute flex items-center justify-center bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black text-black text-center p-2">
            <button className="rounded-md  flex items-center justify-center text-center m-1">
              <Skeleton height="h-10" width=" w-[300px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
