"use client";
import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Toast from "@/components/Toast";

const Page = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const toggleBox = () => {
    if (!isOpen) {
      // 열릴 때 바로 렌더링
      setShouldRender(true);
    }
    setIsOpen((prev) => !prev);
  };

  //애니메이션이 끝났을 때 어떻게 작동할 것인지에 대한 함수
  const handleAnimationEnd = () => {
    if (!isOpen) {
      // 애니메이션 끝나고 나서야 unmount되어야 함
      flushSync(() => {
        //상태 업데이트를 비동기(X) 동기적으로 즉시 반영시킴
        setShouldRender(false);
      });
    }
  };

  return (
    <div>
      {shouldRender && (
        <Toast
          ref={ref}
          className={`${isOpen ? "fade-in" : "fade-out"}`}
          onAnimationEnd={handleAnimationEnd}
        >
          예제 토스트 문구입니다.
        </Toast>
      )}
      <button
        onClick={toggleBox}
        className='z-[999999] rounded bg-blue-500 px-4 py-10 text-white hover:opacity-50'
      >
        토스트 보기
      </button>
    </div>
  );
};

export default Page;
