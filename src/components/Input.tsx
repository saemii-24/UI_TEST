import React, { HTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

interface InputProps<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
  resetField?: () => void;
}

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder = "",
  type = "text",
  register,
  error,
  ...rest // div에 전달할 추가적인 속성들
}: InputProps<T>) => (
  <div className='h flex flex-col gap-2' {...rest}>
    {" "}
    {/* 외부에서 받은 div 관련 속성 적용 */}
    {label && (
      <label htmlFor={name} className='text-sm font-medium text-gray-700'>
        {label}
      </label>
    )}
    <div
      className={`flex w-full items-center gap-3 rounded-full   bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
    >
      <FiSearch className='right-3 font-semibold text-gray-800' />
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className='flex-1 bg-transparent outline-none placeholder:font-medium placeholder:text-gray-500'
      />
      <IoIosClose className='text-2xl text-gray-800' />
    </div>
    {error && <p className='text-xs text-red-500'>{error}</p>}
  </div>
);

export default Input;
