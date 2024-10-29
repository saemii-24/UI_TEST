import React, { HTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

interface InputProps<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  register: ReturnType<UseFormRegister<T>>;
  error?: string;
  reset?: () => void;
  icon?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  label,
  placeholder = "",
  register,
  error,
  reset,
  icon = false,
  ...rest
}: InputProps<T>) => (
  <div className='h flex w-full flex-col gap-2' {...rest}>
    {label && (
      <label htmlFor={name} className='ml-1 text-sm font-medium text-white'>
        {label}
      </label>
    )}
    <div
      className={`flex w-full items-center gap-3 rounded-full bg-white px-6 py-[12px]`}
    >
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
          <IoIosClose
            // reset 함수 호출
            className='cursor-pointer text-2xl text-gray-800'
          />
        </button>
      )}
    </div>
    {error && <p className='ml-1 text-xs text-red-500'>{error}</p>}
  </div>
);

export default Input;
