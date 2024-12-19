import { Carousel } from "@/components/carousel";
import { Lists } from "@/components/lists";
import { Skeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen ">
      <main className="flex flex-col flex-wrap gap-8 items-center sm:items-start min-h-screen w-screen box-border">
        <Suspense fallback={<Skeleton height={"h-full"} width={"w-full"} />}>
          <Carousel />
        </Suspense>
        <Lists />
      </main>
    </div>
  );
}
