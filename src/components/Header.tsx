import React from "react";
import Link from "next/link";

import Signup from "./Signup";

import { PiSunBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user?: string;
  status?: "login" | "logout";
}

const Header = ({ user = "사용자", status = "login" }: HeaderProps) => {
  const route = useRouter();
  return (
    <div className='absolute z-40 w-full text-white'>
      <div className='justify-betweens container  mx-auto flex w-full items-center'>
        <Link href='/' className=' flex h-[60px] items-center justify-between'>
          {/* 로고 */}
          <div className=' flex items-center gap-2 text-white'>
            <span className='text-sm font-semibold text-white'>SEARCH</span>
          </div>
          {/* 로그인 */}
        </Link>

        <div className='ml-auto flex items-center justify-center gap-2'>
          <PiSunBold className='mr-4 font-bold text-white' />
          <div>
            어서오세요! <span className='font-semibold'>{user}</span>님
          </div>
          <Signup
            status={status}
            onClick={() => {
              route.push("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
