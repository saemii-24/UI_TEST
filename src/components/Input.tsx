import { searchProps } from "@/app/page";
import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<searchProps>;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
}) => (
  <div>
    <div className='flex items-center gap-3'>
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className={`border px-4 py-2 ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <CiSearch />
      </div>
    </div>
    {error && <p className='text-red-500'>{error}</p>}
  </div>
);

export default Input;
