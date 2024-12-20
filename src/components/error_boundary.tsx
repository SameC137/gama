"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { APIError } from "@/utils/requests";
import { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function DefaultFallBack({
  error,
  resetErrorBoundary,
}: {
  error: ErrorInfo;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 flex flex-col justify-center item-center w-full text-center">
      <h2 className="text-lg font-semibold text-destructive mb-2 w-full ">
        {error instanceof APIError ? error.message : "Something went wrong"}
      </h2>

      <button
        className="bg-white rounded-md px-2 py-2 w-[300px] text-black shadow-sm hover:bg-opacity-50 flex items-center justify-center text-center w-full"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

export const ErrorBoundaryWithHandler: React.FC<{
  children: React.ReactNode;
  fallBack?: ({
    error,
    resetErrorBoundary,
  }: {
    error: any;
    resetErrorBoundary: any;
  }) => JSX.Element;
  resetFunc?: () => any;
}> = ({ children, fallBack, resetFunc }) => {
  const handleLogError = (error: Error) => {
    console.log("Error", error);
  };

  return (
    <ErrorBoundary
      FallbackComponent={fallBack || DefaultFallBack}
      onError={handleLogError}
      onReset={resetFunc}
    >
      {children}
    </ErrorBoundary>
  );
};
