import React from "react";

export const BlurredButton: React.FC<{ children: React.ReactNode, style?:string }> = ({
  children,
  style
}) => {
  return (
    <button className={`bg-white bg-opacity-25 backdrop-blur-[30px] text-white rounded-full shadow-sm hover:bg-opacity-50 ${style}`}>
      {children}
    </button>
  );
};
