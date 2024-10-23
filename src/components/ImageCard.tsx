import React from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";

const ImageCard = ({ imageList }: { imageList: Partial<ImageListProps> }) => {
  if (!imageList.webformatURL) return;
  console.log("이미지가 존재합니다.");
  return (
    <div>
      <div className='relative w-full max-w-[400px] overflow-hidden rounded-xl'>
        <Image
          src={imageList.webformatURL}
          alt={imageList.id + "image" + imageList.user}
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      {imageList.user && imageList.userImageURL && (
        <div className='mt-4 flex items-center  gap-2'>
          <div className='relative size-12 overflow-hidden rounded-full'>
            <Image
              src={imageList.userImageURL}
              alt={imageList.id + "image" + imageList.user}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className='text-lg font-semibold'>Photo by. {imageList.user}</div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
