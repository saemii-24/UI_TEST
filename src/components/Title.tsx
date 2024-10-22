import React from "react";
import cn from "classnames";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-center text-[3rem] font-black text-white block px-5 py-1 rounded-md",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
