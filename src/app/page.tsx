import { Carousel } from "@/components/carousel";
import { ErrorBoundary } from "@/components/error_boundary";
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
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [key: string]: any;
  };
}) {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-8 items-center sm:items-start min-h-screen w-screen box-border">
        <SWRProvider fallback={{ fallback }}>
          <ErrorBoundary>
            <Suspense fallback={<CarouselSkeleton />}>
              <Carousel />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<MovieListSkeleton />}>
              <MovieList title="Recent Movies" dataPoint={"/recent-movies"} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<MovieListSkeleton />}>
              <MovieList title="Box Office" dataPoint={"/box-office-movies"} />
            </Suspense>
          </ErrorBoundary>
        </SWRProvider>
      </main>
    </div>
  );
}
