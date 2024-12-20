"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: {
    [key: string]: any;
  };
}) => {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
};
