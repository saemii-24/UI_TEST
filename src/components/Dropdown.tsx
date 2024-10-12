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
    <ul className='absolute mt-1 w-full rounded-md border bg-white'>
      {localSearchKeyword.map((keyword) => (
        <li
          key={keyword}
          className='flex cursor-pointer items-center p-2 pl-4 hover:bg-gray-200'
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
              data-testid={keyword}
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
