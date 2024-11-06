import React from "react";
import cn from "classnames";
import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-4 text-red-500",
        )}
      >
        <BiError className='text-5xl ' />
        <div className='font-medium  text-red-500'>
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    </div>
  );
};

export default Error;
