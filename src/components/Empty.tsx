import React from "react";
import { TbMoodEmpty } from "react-icons/tb";
import cn from "classnames";
interface EmptyProps {
  className?: string;
  searchKeyword: string;
}

const Empty = ({ className, searchKeyword }: EmptyProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 text-gray-300",
        className,
      )}
    >
      <TbMoodEmpty className='text-5xl ' />
      <div className='font-medium text-gray-400'>
        {searchKeyword}에 대한 검색 결과가 없습니다.
      </div>
    </div>
  );
};

export default Empty;
