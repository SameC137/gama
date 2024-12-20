import React from "react";
import { SearchPage } from "./search_screen";
import { SWRProvider } from "./swr_provider";

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between relative max-sm:fixed bg-gradient-to-b from-black to-transparent  z-10 w-full py-4 px-8">
      <p>GAMMA</p>
      <SWRProvider
        fallback={{
          "/filter-movie?name=": [],
        }}
      >
        <SearchPage />
      </SWRProvider>
    </div>
  );
};
