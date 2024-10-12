import React from "react";
import Image from "next/image";
import type { ImageListProps } from "@/types/type";

const List = ({ imageList }: { imageList: ImageListProps[] }) => {
  console.log(imageList);

  return (
    <div className='mt-7 columns-2 space-y-6 px-2 md:columns-3 md:px-5 lg:col-span-4 xl:col-span-5'>
      {imageList.map((item, index) => {
        return (
          <div key={index}>
            <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:rounded-3xl before:opacity-50 hover:before:bg-gray-600'>
              <Image
                src={item.webformatURL}
                alt={item.user}
                width={500}
                height={500}
                className='relative z-0 cursor-pointer rounded-3xl'
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
