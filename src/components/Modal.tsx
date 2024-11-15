"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import useModalImageId from "@/store/modalImageIdStore";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import cn from "classnames";
import Button from "./Button";
import Link from "next/link";

const Modal = () => {
  const { modalImage, setModalImage } = useModalImageId();
  const [isLike, setIsLike] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutSide = (event: MouseEvent) => {
      if (event.target === backgroundRef.current) {
        setModalImage(undefined);
      }
    };
    window.addEventListener("mousedown", clickOutSide);
    return () => {
      window.removeEventListener("mousedown", clickOutSide);
    };
  }, [setModalImage]);

  useEffect(() => {
    const preventScroll = () => {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    };
    const enableScroll = () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    if (modalImage) preventScroll();
    else enableScroll();
    return enableScroll;
  }, [modalImage]);

  const toggleLike = useCallback(() => {
    setIsLike((prev) => !prev);
    if (modalImage && modalImage.likes !== undefined) {
      const updatedImage = {
        ...modalImage,
        likes: isLike ? modalImage.likes - 1 : modalImage.likes + 1,
      };
      setModalImage(updatedImage);
    }
  }, [isLike, modalImage, setModalImage]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(modalImage?.largeImageURL || "");
      alert("이미지의 URL이 클립보드에 복사되었습니다!");
    } catch {
      alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!modalImage || !modalImage.webformatURL) {
    return null;
  }

  return (
    <div
      data-testid='image-modal'
      ref={backgroundRef}
      className='fixed inset-0 z-[9999] h-screen w-full bg-black/30'
    >
      <div
        role='dialog'
        ref={modalRef}
        className='relative left-1/2 top-1/2 h-[70vh] max-h-[560px] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-lg'
      >
        <div
          data-testid='close-button'
          className='absolute right-4 top-4 z-[10000] cursor-pointer rounded-full bg-white p-2 text-2xl font-bold text-black'
          onClick={() => setModalImage(undefined)}
        >
          <VscChromeClose />
        </div>
        <div className={cn("relative w-full h-[55%] flex-col")}>
          <Image
            src={modalImage.webformatURL}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 500px'
            alt={`${modalImage.id} image-thumbnail ${modalImage.user}`}
            priority
            fill
            objectFit='cover'
            className='bg-gray-200'
          />
        </div>
        <div className='flex size-full h-[45%] flex-col px-5 pb-5 pt-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='mt-2 flex flex-1 items-center gap-2'>
              {modalImage.userImageURL && (
                <div className='relative size-16 overflow-hidden rounded-full'>
                  <Image
                    src={modalImage.userImageURL}
                    alt={`${modalImage.id} image-user ${modalImage.user}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              )}
              <div className='flex-1 '>
                <div className='flex items-center justify-between'>
                  {modalImage.user && (
                    <div className='text-xl font-semibold'>
                      Photo by. {modalImage.user}
                    </div>
                  )}
                  <div className='flex items-center gap-2'>
                    <div
                      data-testid='like-button'
                      onClick={toggleLike}
                      className='mt-2 flex cursor-pointer items-center gap-1'
                    >
                      {isLike ? (
                        <RiHeart3Fill
                          data-testid='like-icon-fill'
                          className='text-xl text-red-500'
                        />
                      ) : (
                        <RiHeart3Line
                          data-testid='like-icon-line'
                          className='text-xl text-red-500'
                        />
                      )}
                    </div>
                    <div
                      data-testid='share-button'
                      onClick={copyUrl}
                      className='cursor-pointer'
                    >
                      <IoShareSocialOutline className='translate-y-1 text-xl' />
                    </div>
                  </div>
                </div>
                <div className='mt-1 flex gap-2 text-sm text-gray-600'>
                  {modalImage.tags
                    ?.split(", ")
                    .map((item, index) => (
                      <div key={index}>#{item.replace(/\s+/g, "_")}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <Link
            data-testid='download-button'
            className='mt-auto'
            href={modalImage.largeImageURL || ""}
            target='_blank'
          >
            <Button name='다운로드' rounded='full' width='full' color='blue'>
              다운로드
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
