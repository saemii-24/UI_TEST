import { searchProps } from "@/app/page";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { CgClose } from "react-icons/cg";

interface DropdownProps {
  localSearchKeyword: string[];
  setValue: UseFormSetValue<searchProps>;
  onRemove: (keyword: string) => void;
}

const Dropdown = ({ localSearchKeyword, setValue, onRemove }: DropdownProps) => {
  return (
    <ul className='w-full absolute bg-white border rounded-md mt-1'>
      {localSearchKeyword.map((keyword) => (
        <li
          key={keyword}
          className='p-2 cursor-pointer hover:bg-gray-200 flex pl-4 items-center'
        >
          <span
            className='flex-1'
            onClick={() => {
              setValue("searchKeyword", keyword);
            }}
          >
            {keyword}
          </span>
          <div className='px-4'>
            <CgClose
              onClick={(e) => {
                e.preventDefault();
                onRemove(keyword as string);
              }}
              className='font-bold hover:opacity-55'
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
