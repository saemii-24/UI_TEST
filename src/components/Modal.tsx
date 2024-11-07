"use client";
import React, { useEffect } from "react";
import useModalImageId from "@/store/modalImageIdStore";
import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";

const Modal = () => {
  const { modalImage, setModalImage } = useModalImageId();

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
      <div className='absolute left-1/2 top-1/2 h-[80vh] w-[90%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-lg'>
        <VscChromeClose className='text-2xl font-bold ' />
        <div>
          <Image
            className='bg-gray-200'
            src={modalImage.webformatURL as string}
            fill
            alt={`${modalImage.id} image-thumbnail ${modalImage.user}`}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
