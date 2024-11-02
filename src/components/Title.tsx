import React, { HTMLAttributes } from "react";
import cn from "classnames";
import { VscSparkleFilled } from "react-icons/vsc";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-[40px] font-black text-gray-800 rounded-md flex justify-center items-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
      <VscSparkleFilled />
    </h1>
  );
};

export default Title;
