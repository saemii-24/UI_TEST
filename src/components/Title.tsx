import React, { HTMLAttributes } from "react";
import cn from "classnames";
import { VscSparkleFilled } from "react-icons/vsc";

// h1 요소를 확장하려면 HTMLAttributes<HTMLHeadingElement> 사용
interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className, ...rest }: TitleProps) => {
  return (
    <h1
      className={cn(
        "text-4xl font-black text-white rounded-md flex items-center gap-2",
        className,
      )}
      {...rest}
    >
      {children}
      <VscSparkleFilled />
    </h1>
  );
};

export default Title;
