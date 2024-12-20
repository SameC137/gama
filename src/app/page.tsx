import { Carousel } from "@/components/carousel";
import { MovieList } from "@/components/movie_list";
import { CarouselSkeleton, MovieListSkeleton } from "@/components/skeletons";
import { SWRProvider } from "@/components/swr_provider";
import { fetcher } from "@/utils/requests";
import { Suspense } from "react";

export async function fetchCache() {
  const recentMovies = await fetcher("/recent-movies");
  const boxOffice = await fetcher("/box-office-movies");
  return {
    props: {
      fallback: {
        "/recent-movies": recentMovies,
        "/box-office-movies": boxOffice,
      },
    },
  };
}

export default function Home({
  fallback,
}: {
  fallback: {
    [key: string]: any;
  };
}) {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-8 items-center sm:items-start min-h-screen w-screen box-border">
        <SWRProvider fallback={{ fallback }}>
          <Suspense fallback={<CarouselSkeleton />}>
            <Carousel />
          </Suspense>
          <Suspense fallback={<MovieListSkeleton />}>
            <MovieList title="Recent Movies" dataPoint={"/recent-movies"} />
          </Suspense>
          <Suspense fallback={<MovieListSkeleton />}>
            <MovieList title="Box Office" dataPoint={"/box-office-movies"} />
          </Suspense>
        </SWRProvider>
      </main>
    </div>
  );
}
