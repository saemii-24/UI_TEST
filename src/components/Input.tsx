import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

interface InputProps<T extends FieldValues> {
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
}: InputProps<T>) => (
  <div className='flex flex-col gap-2'>
    {label && (
      <label htmlFor={name} className='text-sm font-medium text-gray-700'>
        {label}
      </label>
    )}
    <div
      className={`w-full flex items-center gap-3 rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <CiSearch className=' right-3 text-gray-400' />
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className='flex-1'
      />
      <IoIosClose />
    </div>
    {error && <p className='text-xs text-red-500'>{error}</p>}
  </div>
);

export default Input;
