import React from "react";
import { MdError } from "react-icons/md";
import cn from "classnames";
interface ErrorProps {
  className?: string;
}

const ErrorComponent = ({ className }: ErrorProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 text-gray-300",
        className,
      )}
    >
      <MdError className='text-5xl ' />
      <div className='font-medium text-gray-400'>
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    </div>
  );
};

export default ErrorComponent;
