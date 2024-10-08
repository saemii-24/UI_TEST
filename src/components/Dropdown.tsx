import React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface DropdownProps {
  filteredKeywords: string[];
  setDropdownVisible: (value: boolean) => void;
  setValue: UseFormSetValue<FieldValues>;
}

const Dropdown = ({ filteredKeywords, setDropdownVisible, setValue }: DropdownProps) => {
  <ul className='absolute bg-white border rounded-md mt-1'>
    {filteredKeywords.map((keyword) => (
      <li
        key={keyword}
        className='p-2 cursor-pointer hover:bg-gray-200'
        onClick={() => {
          setDropdownVisible(false);
          setValue("searchKeyword", keyword);
        }}
      >
        {keyword}
      </li>
    ))}
  </ul>;
};

export default Dropdown;
