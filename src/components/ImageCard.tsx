import React from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";
import Tag from "./Tag";

const ImageCard = ({ imageList }: { imageList: ImageListProps[] }) => {
  return (
    <div className='relative'>
      {imageList.map((item, index) => (
        <div key={item.id + `${index}`} className='relative'>
          <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
            <Image
              src={item.webformatURL}
              alt={item.user}
              width={500}
              height={500}
              className='relative z-0 cursor-pointer'
            />
          </div>

          {/* 사용자 사진이 있는 경우에만 렌더링 */}
          <div className='size-full bg-red-100'>
            <div className='flex items-center gap-2'>
              {item.userImageURL && (
                <div className='size-10 overflow-hidden rounded-full'>
                  <Image
                    src={item.userImageURL}
                    alt={item.user}
                    width={40}
                    height={40}
                    className='relative z-0 cursor-pointer'
                  />
                </div>
              )}
              {item.user && <div className='font-medium '>{item.user}</div>}
            </div>
          </div>

          {/* 태그가 있는 경우에만 렌더링 */}
          {/* {item.tags &&
            item.tags.split(",").map((item) => {
              return (
                <React.Fragment key={item}>
                  <Tag>{item}</Tag>
                </React.Fragment>
              );
            })} */}
        </div>
      ))}
    </div>
  );
};

export default ImageCard;
