"use client";
import React, { useEffect, useState } from "react";
import useModalImageId from "@/store/modalImageIdStore";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import cn from "classnames";
import Button from "./Button";
const Modal = () => {
  const { modalImage, setModalImage } = useModalImageId();
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalImage(undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, setModalImage]);

  // modalImage가 없거나 webformatURL이 없을 경우 모달을 렌더링하지 않도록 방어
  if (!modalImage || !modalImage.webformatURL) {
    setModalImage(undefined);
    return null;
  }

  return (
    <div className='fixed inset-0 z-[9999] h-screen w-full bg-black/30'>
      <div className='relative left-1/2 top-1/2 h-[80vh] w-[90%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-lg'>
        <VscChromeClose className='text-2xl font-bold ' />
        <div className={cn("center-absolute  h-1/2 w-[90%] flex-col")}>
          <Image
            src={modalImage.webformatURL as string}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt={`${modalImage.id} image-thumbnail ${modalImage.user}`}
            priority
            width={0}
            height={0}
            className='center-absolute bg-gray-200'
            style={{ width: "auto", height: "100%" }}
          />
        </div>
        {/* <button
          type='button'
          className='center-flex h-12 rounded-full border border-stone-300 px-6 py-4'
        >
          <RiHeart3Line className='text-lg' />
        </button> */}
        <Button
          rounded='full'
          onClick={() => {
            setIsLike(!isLike);
          }}
        >
          <div className='center-flex gap-1'>
            {isLike ? (
              <RiHeart3Fill className='text-lg' />
            ) : (
              <RiHeart3Line className='text-lg' />
            )}
            <div>{modalImage.likes}</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Modal;
