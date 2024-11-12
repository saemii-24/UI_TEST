import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";
import useModalImageId from "@/store/modalImageIdStore";

export interface ImageCardProps extends React.HTMLProps<HTMLDivElement> {
  imageList: Partial<ImageListProps>;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageList, ...props }: ImageCardProps) => {
  const imageCardRef = useRef<HTMLDivElement>(null);

  const { modalImage, setModalImage } = useModalImageId();
  const [cardWidth, setCardWidth] = useState<number>(0);

  // 이미지 비율에 맞는 height 계산
  const calculateHeight = (width: number) => {
    return (width * (imageList.imageHeight ?? 1)) / (imageList.imageWidth ?? 1);
  };

  useEffect(() => {
    if (imageCardRef.current) {
      setCardWidth(imageCardRef.current.offsetWidth);
    }
    // 리사이즈 이벤트에 대응
    const handleResize = () => {
      if (imageCardRef.current) {
        setCardWidth(imageCardRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!imageList.webformatURL) return null;

  return (
    <>
      <div
        onClick={() => {
          setModalImage(imageList);
        }}
        data-testid='image-card'
        ref={imageCardRef}
        {...props}
      >
        <div className='relative w-full max-w-screen-md cursor-pointer overflow-hidden rounded-xl before:absolute before:z-10 before:size-full before:opacity-40 before:transition-all before:duration-150 hover:before:bg-black'>
          <Image
            className='bg-gray-200'
            src={imageList.webformatURL}
            alt={`${imageList.id} image-thumbnail ${imageList.user}`}
            width={cardWidth}
            height={calculateHeight(cardWidth)}
            style={{ width: cardWidth, height: calculateHeight(cardWidth) }}
            priority
          />
        </div>
        {imageList.user &&
          imageList.user.length > 0 &&
          imageList.userImageURL &&
          imageList.userImageURL.length > 0 && (
            <div className='mt-2 flex items-center gap-2'>
              <div className='relative size-10 overflow-hidden rounded-full'>
                <Image
                  src={imageList.userImageURL}
                  alt={`${imageList.id} image-user ${imageList.user}`}
                  width='40'
                  height='40'
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className='text-base font-semibold'>Photo by. {imageList.user}</div>
            </div>
          )}
      </div>
    </>
  );
};

export default ImageCard;
