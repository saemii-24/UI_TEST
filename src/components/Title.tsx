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
        "bg-white text-center text-[2rem] font-black block px-5 py-1 rounded-md",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
