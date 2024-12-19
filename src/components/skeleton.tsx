import React from "react";

export const Skeleton: React.FC<{ height: string; width: string }> = ({
  height,
  width,
}) => {
  return (
    <div className={` ${width} ${height} `}>
      <div className="animate-shimmer bg-gradient-to-r from-gray-800 via-black to-gray-800 h-full "></div>
    </div>
  );
};
