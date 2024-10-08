import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h1 className='text-[3rem] font-bold'>{children}</h1>;
};

export default Title;
