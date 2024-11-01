import React, { HTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { cva } from "class-variance-authority";

interface InputProps<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  register: ReturnType<UseFormRegister<T>>;
  error?: string;
  reset?: () => void;
  icon?: boolean;
  bgColor?: "white" | "gray";
}

const inputStyles = cva(
  "flex w-full items-center gap-3 rounded-full px-6 py-[12px]", // 공통 스타일
  {
    variants: {
      bgColor: {
        white: "bg-white",
        gray: "bg-gray-100",
      },
    },
    defaultVariants: {
      bgColor: "white", // 기본값 설정
    },
  },
);

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder = "",
  register,
  error,
  reset,
  icon = false,
  bgColor = "white", // 기본값 설정
  ...rest
}: InputProps<T>) => (
  <div className='flex w-full flex-col gap-2' {...rest}>
    {label && (
      <label htmlFor={name} className='ml-1 text-sm font-medium text-white'>
        {label}
      </label>
    )}
    <div className={inputStyles({ bgColor })}>
      {icon && <FiSearch className='text-gray-800' />}

      <input
        id={name}
        placeholder={placeholder}
        type='text'
        {...register}
        className='flex-1 bg-transparent outline-none placeholder:font-medium placeholder:text-gray-500'
      />

      {reset && (
        <button onClick={reset} type='button' data-testid={`reset-${name}`}>
          <IoIosClose className='cursor-pointer text-2xl text-gray-800' />
        </button>
      )}
    </div>
    {error && <p className='ml-1 text-xs text-red-500'>{error}</p>}
  </div>
);

export default Input;
