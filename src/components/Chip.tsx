import React from "react";
import { IoIosClose } from "react-icons/io";

interface ChipProps {
  children: React.ReactNode;
  onRemove: (keyword: string) => void;
}

const Chip = ({ children, onRemove }: ChipProps) => {
  return (
    <button
      type='button'
      className='flex items-center justify-center gap-2 rounded-full border border-blue-400 px-4 py-[6px] font-medium transition hover:bg-blue-100'
    >
      {children}
      <IoIosClose onClick={() => onRemove(children as string)} className='font-bold' />
    </button>
  );
};

export default Chip;
