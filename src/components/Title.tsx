import React, { HTMLAttributes } from "react";
import cn from "classnames";
import { VscSparkleFilled } from "react-icons/vsc";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <h1
      className={cn("text-4xl font-black text-white rounded-md flex items-center gap-2")}
      {...rest}
    >
      {children}
      <VscSparkleFilled />
    </h1>
  );
};

export default Title;
