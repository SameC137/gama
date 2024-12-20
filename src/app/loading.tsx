import { CarouselSkeleton, MovieListSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-8 items-center sm:items-start min-h-screen w-screen box-border">
        <CarouselSkeleton />
        <MovieListSkeleton />
        <MovieListSkeleton />
      </main>
    </div>
  );
}
