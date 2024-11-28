"use client";
import { RefObject, useCallback, useLayoutEffect, useState } from "react";

//애니메이션 상태: 초기상태 - 애니메이션 중 - 종료
type AnimationState = "idle" | "animating" | "ended";

export function useAnimationEnd(ref: RefObject<HTMLElement | null>, isOpen: boolean) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>("idle");

  const handleAnimationEnd = useCallback(() => {
    setAnimationState("ended");
    setIsAnimating(false);
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // 애니메이션 시작 조건
    if (!isOpen && animationState === "idle") {
      setAnimationState("animating"); //애니메이션 중으로 상황 변경
      setIsAnimating(true); //애니메이션이 진행중이므로 true로 변경
    }

    // 애니메이션 상태가 "animating"일 때 이벤트 리스너 추가
    if (animationState === "animating") {
      //keyframe 애니메이션이 지정되었는지를 찾는다
      const computedStyle = window.getComputedStyle(element);
      //keyframe 애니메이션이 지정되어있을 경우에만 애니메이션 이름을 반환한다.
      if (computedStyle.animationName && computedStyle.animationName !== "none") {
        const handleAnimationEndEvent = (e: AnimationEvent) => {
          if (e.target === element) {
            //e.target(애니메이션이 끝난 dom요소)와 element(애니메이션 추적 대상 요소)가 같다면,
            //즉, 내가 추적하는 요소의 애니메이션이 종료되었다면 애니메이션 상태는 종료로 변경한다.
            handleAnimationEnd();
          }
        };

        element.addEventListener("animationend", handleAnimationEndEvent);

        return () => {
          element.removeEventListener("animationend", handleAnimationEndEvent);
        };
      } else {
        // 애니메이션이 없으면 즉시 종료 처리
        handleAnimationEnd();
      }
    }
  }, [ref, isOpen, animationState, handleAnimationEnd]);

  return isAnimating;
}
