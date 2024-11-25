import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className='group relative size-64 rounded-lg before:absolute before:inset-0 before:size-64 before:bg-black before:opacity-0 before:content-none hover:before:opacity-50'>
      <Image
        src='/shin_pic.jpg'
        alt='짱구'
        layout='fill'
        objectFit='cover'
        className='rounded-lg'
      />
    </div>
  );
};

export default Page;
