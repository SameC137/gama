import { useState, useEffect, SyntheticEvent } from "react";
import Image, { ImageProps } from "next/image";

const fallbackImage = "/fallback.jpg";
interface ImageWithFallBackProps extends ImageProps {
  fallback?: string;
}

export const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallBackProps) => {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={(e) => setError(e)}
      src={error ? fallback : src}
      {...props}
    />
  );
};
