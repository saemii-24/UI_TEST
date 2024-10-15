import React from "react";
import { IoMdFlower } from "react-icons/io";
import { PiSunBold } from "react-icons/pi";

const Header = () => {
  return (
    <div className='absolute z-40 w-full'>
      <div className='container mx-auto flex h-[50px] items-center justify-between'>
        {/* 로고 */}
        <div className=' flex items-center gap-2 text-white'>
          <IoMdFlower className='' />
          <span className='text-sm font-semibold'>SEARCH</span>
        </div>
        {/* 로그인 */}
        <PiSunBold className='font-bold text-white' />
      </div>
    </div>
  );
};

export default Header;
