import React from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";

const ImageCard = ({ imageList }: { imageList: Partial<ImageListProps> }) => {
  if (!imageList.webformatURL) return;

  return (
    <div data-testid='image-card'>
      <div className='relative w-full max-w-[400px] cursor-pointer overflow-hidden rounded-xl before:absolute before:z-10 before:size-full before:opacity-40 before:transition-all before:duration-150 hover:before:bg-black'>
        <Image
          src={imageList.webformatURL}
          alt={imageList.id + "image-thumbnail" + imageList.user}
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      {imageList.user &&
        imageList.user.length > 0 &&
        imageList.userImageURL &&
        imageList.userImageURL.length > 0 && (
          <div className='mt-2 flex items-center  gap-2'>
            <div className='relative size-10 overflow-hidden rounded-full'>
              <Image
                src={imageList.userImageURL}
                alt={imageList.id + "image-user" + imageList.user}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className='text-base font-semibold'>Photo by. {imageList.user}</div>
          </div>
        )}
    </div>
  );
};

export default ImageCard;
