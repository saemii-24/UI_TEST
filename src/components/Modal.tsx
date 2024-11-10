"use client";
import React, { useEffect, useState, useRef } from "react";
import useModalImageId from "@/store/modalImageIdStore";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import cn from "classnames";
import Button from "./Button";

const Modal = () => {
  const { modalImage, setModalImage } = useModalImageId();
  const [isLike, setIsLike] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null); // 모달 흰색 부분
  const backgroundRef = useRef<HTMLDivElement | null>(null); // 모달 배경

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const clickOutSide = (event: MouseEvent) => {
      const eventTarget = event.target;
      // 클릭된 곳이 모달 외부인 경우 모달을 닫음
      if (eventTarget === backgroundRef.current) {
        setModalImage(undefined);
      }
    };

    window.addEventListener("mousedown", clickOutSide);

    return () => {
      window.removeEventListener("mousedown", clickOutSide);
    };
  }, [setModalImage]);

  // 모달 열릴 때 스크롤 막고 레이아웃 이동 방지
  useEffect(() => {
    const preventScroll = () => {
      if (typeof window !== "undefined") {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden"; // 스크롤 방지
        document.body.style.paddingRight = `${scrollBarWidth}px`; // 스크롤바 너비만큼 padding-right 추가함
      }
    };

    const enableScroll = () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };

    // 모달이 열리면 preventScroll, 닫히면 enableScroll
    if (modalImage) {
      preventScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll(); // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [modalImage]);

  // 모달이 열리지 않아야 하는 상황
  if (!modalImage || !modalImage.webformatURL) {
    setModalImage(undefined);
    return null;
  }

  return (
    <div
      ref={backgroundRef}
      className='fixed inset-0 z-[9999] h-screen w-full bg-black/30'
    >
      <div
        ref={modalRef}
        className='relative left-1/2 top-1/2 h-[70vh] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-lg'
      >
        <div className='absolute right-4 top-4 z-[10000] cursor-pointer rounded-full bg-white  p-2 text-2xl font-bold text-black'>
          <VscChromeClose
            className='text-black'
            onClick={() => setModalImage(undefined)}
          />
        </div>
        <div className={cn("relative w-full h-[55%] flex-col")}>
          <Image
            src={modalImage.webformatURL as string}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 500px'
            alt={`${modalImage.id} image-thumbnail ${modalImage.user}`}
            priority
            fill
            objectFit='cover'
            className=' bg-gray-200'
          />
        </div>
        <div className='flex size-full h-[45%] flex-col  px-5 pb-5 pt-4'>
          <div className='flex items-center justify-between gap-3'>
            {modalImage.user &&
              modalImage.user.length > 0 &&
              modalImage.userImageURL &&
              modalImage.userImageURL.length > 0 && (
                <div className='mt-2 flex flex-1 items-center gap-2'>
                  <div className='relative size-16 overflow-hidden rounded-full'>
                    <Image
                      src={modalImage.userImageURL}
                      alt={`${modalImage.id} image-user ${modalImage.user}`}
                      width='80'
                      height='80'
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className='flex-col'>
                    {/* 사진 촬영자 이름 */}
                    <div className='flex items-center justify-between'>
                      <div className='text-xl font-semibold'>
                        Photo by. {modalImage.user}
                      </div>
                      <div
                        onClick={() => {
                          setIsLike(!isLike);
                          if (modalImage.likes) {
                            modalImage.likes = isLike
                              ? modalImage.likes - 1
                              : modalImage.likes + 1;
                            setModalImage(modalImage);
                          }
                        }}
                        className='mt-2 flex cursor-pointer items-center gap-1'
                      >
                        {isLike ? (
                          <RiHeart3Fill className='text-lg text-red-500' />
                        ) : (
                          <RiHeart3Line className='text-lg text-red-500' />
                        )}
                        {/* <div>{modalImage.likes}</div> */}
                      </div>
                    </div>
                    {/* 이미지 태그 */}
                    <div className=' mt-1 flex gap-2 text-sm text-gray-600'>
                      {modalImage.tags?.split(", ").map((item, index) => {
                        return <div key={index}>#{item.replace(/\s+/g, "_")}</div>;
                      })}
                    </div>
                    {/* 이미지 좋아요 버튼 */}
                    {/* <div
                      onClick={() => {
                        setIsLike(!isLike);
                        if (modalImage.likes) {
                          modalImage.likes = isLike
                            ? modalImage.likes - 1
                            : modalImage.likes + 1;
                          setModalImage(modalImage);
                        }
                      }}
                      className='mt-2 flex cursor-pointer items-center gap-1'
                    >
                      {isLike ? (
                        <RiHeart3Fill className='text-lg text-red-500' />
                      ) : (
                        <RiHeart3Line className='text-lg text-red-500' />
                      )}
                      <div>{modalImage.likes}</div>
                    </div> */}
                  </div>
                </div>
              )}
          </div>

          {/* <Button
            rounded='full'
            width='full'
            className=''
            onClick={() => {
              setIsLike(!isLike);
              if (modalImage.likes) {
                modalImage.likes = isLike ? modalImage.likes - 1 : modalImage.likes + 1;
                setModalImage(modalImage);
              }
            }}
          >
            <div className='mt-2 flex cursor-pointer items-center gap-1'>
              {isLike ? (
                <RiHeart3Fill className='text-lg text-red-500' />
              ) : (
                <RiHeart3Line className='text-lg text-red-500' />
              )}
              <div>{modalImage.likes}</div>
            </div>
          </Button> */}
          <Button rounded='full' width='full' color='blue' className='mt-auto'>
            다운로드
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
