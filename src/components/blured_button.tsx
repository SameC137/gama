import React from "react";

export const BlurredButton: React.FC<{
  children: React.ReactNode;
  style?: string;
  onClick?: () => any;
}> = ({ children, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white bg-opacity-25 backdrop-blur-[30px] text-white rounded-full shadow-sm hover:bg-opacity-50 ${style}`}
    >
      {children}
    </button>
  );
};
