import React from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";
import Tag from "./Tag";

const ImageCard = ({ imageList }: { imageList: ImageListProps[] }) => {
  return (
    <div className='relative'>
      {imageList.map((item, index) => (
        <div key={item.id + `${index}`} className='group relative'>
          {/* 이미지 컨테이너 */}
          <div className='relative size-[500px] cursor-pointer'>
            <Image
              src={item.webformatURL}
              alt={item.user}
              width={500}
              height={500}
              className='relative z-0 cursor-pointer'
            />

            {/* Hover시 나타나는 검은 투명 배경 및 유저 정보 */}
            <div className='absolute inset-0 z-10 flex items-center justify-center gap-4 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              {/* 사용자 사진이 있는 경우에만 렌더링 */}
              {item.userImageURL && (
                <div className='size-12 overflow-hidden rounded-full'>
                  <Image
                    src={item.userImageURL}
                    alt={item.user}
                    width={48}
                    height={48}
                    className='object-cover'
                  />
                </div>
              )}

              {/* 사용자 이름 */}
              {item.user && <div className='font-medium text-white'>{item.user}</div>}
            </div>
          </div>

          {/* 태그가 있는 경우에만 렌더링 */}
          {/* {item.tags &&
            item.tags.split(",").map((tag) => {
              return (
                <React.Fragment key={tag}>
                  <Tag>{tag}</Tag>
                </React.Fragment>
              );
            })} */}
        </div>
      ))}
    </div>
  );
};

export default ImageCard;
