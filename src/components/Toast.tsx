import React, { ReactNode, forwardRef } from "react";
import cn from "classnames";

type ToastProps = {
  children: ReactNode;
  className: string;
  onAnimationEnd?: () => void; // 애니메이션 종료 이벤트 핸들러
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ children, className, onAnimationEnd }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-[9999] top-[55px] w-[calc(100%-32px)] text-center rounded-2xl bg-[#31d742] px-6 py-4 text-white shadow-lg md:w-fit",
          className,
        )}
        onAnimationEnd={onAnimationEnd}
      >
        <span className='text-basic md:text-sm'>{children}</span>
      </div>
    );
  },
);

Toast.displayName = "Toast";

export default Toast;
