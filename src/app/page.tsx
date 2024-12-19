import { Carousel } from "@/components/carousel";
import { MovieList } from "@/components/movie_list";
import { Skeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-8 items-center sm:items-start min-h-screen w-screen box-border">
        <Suspense fallback={<Skeleton height={"h-full"} width={"w-full"} />}>
          <Carousel />
        </Suspense>
        <Suspense>
          <MovieList
            movies={[
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
                cover_img_url:
                  "http://gama-test-1.onrender.com/public/gentlmen.jpg",
                rating: 9.4,
              },
              {
                Title: "Spy City",
                video_url:
                  "https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
                cover_img_url:
                  "http://gama-test-1.onrender.com/public/spycity.jpg",
                rating: 4.5,
              },
              {
                Title: "Project Runway",
                video_url: "http://media.w3.org/2010/05/sintel/trailer.mp4",
                cover_img_url:
                  "http://gama-test-1.onrender.com/public/runway.jpg",
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
            ]}
          />
        </Suspense>
      </main>
    </div>
  );
}
