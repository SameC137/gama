"use client";

import { useEffect } from "react";
import { DefaultFallBack } from "@/components/error_boundary";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <DefaultFallBack error={error} resetErrorBoundary={reset} />;
}
