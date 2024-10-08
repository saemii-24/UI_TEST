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
      className='font-medium flex-wrap border hover:bg-blue-100 transition border-blue-400 rounded-full flex items-center justify-center gap-2 px-4 py-[6px]'
    >
      {children}
      <IoIosClose onClick={() => onRemove(children as string)} className='font-bold' />
    </button>
  );
};

export default Chip;
