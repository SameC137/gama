import { Carousel } from "@/components/carousel";
import { ErrorBoundaryWithHandler } from "@/components/error_boundary";
import { MovieList } from "@/components/movie_list";
import { CarouselSkeleton, MovieListSkeleton } from "@/components/skeletons";
import { SWRProvider } from "@/components/swr_provider";
import { fetcher } from "@/utils/requests";
import { Suspense } from "react";

export default async function Page() {
  const recentMovies = await fetcher("/recent-movies");
  const boxOffice = await fetcher("/box-office-movies");

  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-4 items-center sm:items-start min-h-screen w-screen box-border">
        <SWRProvider
          fallback={{
            fallback: {
              "/recent-movies": recentMovies,
              "/box-office-movies": boxOffice,
            },
          }}
        >
          <ErrorBoundaryWithHandler>
            <Suspense fallback={<CarouselSkeleton />}>
              <Carousel />
            </Suspense>
          </ErrorBoundaryWithHandler>
          <ErrorBoundaryWithHandler>
            <Suspense fallback={<MovieListSkeleton />}>
              <MovieList title="Recent Movies" dataPoint={"/recent-movies"} />
            </Suspense>
          </ErrorBoundaryWithHandler>
          <ErrorBoundaryWithHandler>
            <Suspense fallback={<MovieListSkeleton />}>
              <MovieList title="Box Office" dataPoint={"/box-office-movies"} />
            </Suspense>
          </ErrorBoundaryWithHandler>
        </SWRProvider>
      </main>
    </div>
  );
}
