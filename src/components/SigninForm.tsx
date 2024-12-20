"use client";
import Input from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";
import SNS from "./SNS";

interface SigninProps {
  id: string;
  password: string;
}

interface SigninFormProps {
  onSubmit: (data: SigninProps) => void;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninProps>();

  return (
    <div className='w-full max-w-md rounded-3xl border border-white bg-white/10 p-10 backdrop-blur-lg'>
      <h1 className='text-center text-3xl font-bold text-gray-800'>Login</h1>
      <div className='mt-2 text-center text-gray-800'>
        로그인하고 좋아하는 이미지를 저장해보세요
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5' role='form'>
        <Input
          name='id'
          placeholder='아이디를 입력해주세요'
          register={register("id", {
            required: "아이디는 필수 입니다.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "아이디는 올바른 이메일 형식으로 입력해야 합니다.",
            },
          })}
          error={errors.id?.message}
          reset={() => reset({ id: "" })}
          icon={true}
          bgColor='gray'
        />
        <Input
          name='password'
          placeholder='비밀번호를 입력해주세요'
          register={register("password", {
            required: "비밀번호는 필수 입니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,20}$/,
              message: "비밀번호는 8~20자의 특수문자와 영문자를 포함해야 합니다.",
            },
          })}
          error={errors.password?.message}
          reset={() => reset({ password: "" })}
          icon={true}
          bgColor='gray'
          className='mt-3'
        />
        <button
          type='submit'
          role='button'
          data-testid='signin'
          className='mt-3 w-full rounded-full bg-blue-500 py-3 text-white'
        >
          로그인
        </button>
      </form>
      <div className='mt-6 flex items-center justify-center'>
        <div className='h-px flex-1 bg-gray-400'></div>
        <span className='px-3 text-gray-400'>SNS로 로그인하기</span>
        <div className='h-px flex-1 bg-gray-400'></div>
      </div>
      <div className='mt-4 flex justify-center space-x-5'>
        {["kakao", "naver", "google"].map((item) => (
          <SNS sns={item as "kakao" | "naver" | "google"} key={item} />
        ))}
      </div>
    </div>
  );
};

export default SigninForm;
