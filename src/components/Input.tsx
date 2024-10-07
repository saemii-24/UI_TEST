import { searchProps } from "@/app/page";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

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
    <div className='relative flex items-center'>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <CiSearch className='absolute right-3 text-gray-400' />
    </div>
    {error && <p className='text-xs text-red-500'>{error}</p>}
  </div>
);

export default Input;
