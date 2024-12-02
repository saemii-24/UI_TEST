"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useToastStore from "@/store/useToastStore";
import Toast from "@/components/Toast";
import { flushSync } from "react-dom";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isToastVisible, showToast, hideToast } = useToastStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  useEffect(() => {
    if (isToastVisible) {
      setShouldRender(true);
      setIsOpen(true);

      // 3초 후에 Toast 숨기기
      const timer = setTimeout(() => {
        hideToast(); // Toast 숨기기
      }, 3000);

      // cleanup: 컴포넌트가 unmount되거나, isToastVisible이 false가 되면 타이머를 clear
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isToastVisible, hideToast]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      flushSync(() => {
        setShouldRender(false);
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {shouldRender && (
        <Toast
          ref={ref}
          className={`${isOpen ? "fade-in" : "fade-out"}`}
          onAnimationEnd={handleAnimationEnd}
        >
          예제 토스트 문구입니다.
        </Toast>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
