"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import Input from "@/components/Input";
import Title from "@/components/Title";
import List from "@/components/List";
import Link from "next/link";

export interface searchProps {
  searchKeyword: string;
}

export default function Home() {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<searchProps>();

  const [localSearchKeyword, setLocalSearchKeyword] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onSubmit: SubmitHandler<searchProps> = (data) => {
    const currentKeywords = localStorage.getItem("searchKeywords");
    const savedKeywords = currentKeywords ? JSON.parse(currentKeywords) : [];
    const updatedKeywords = [...savedKeywords, data.searchKeyword];
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
    setLocalSearchKeyword(data.searchKeyword);
    setDropdownVisible(false);
  };

  useEffect(() => {
    const savedKeywords = localStorage.getItem("searchKeywords");
    if (savedKeywords) {
      setLocalSearchKeyword(JSON.parse(savedKeywords));
    }
  }, []);

  const [defaultImage, setDefaultImage] = useState<string>(
    "https://cdn.pixabay.com/photo/2020/05/06/06/18/blue-5136251_1280.jpg",
  );

  return (
    <div className='min-h-screen w-full'>
      <div className='relative flex h-[450px] w-full items-center justify-center'>
        <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white' />
        <Image
          src={defaultImage}
          fill
          alt='backgroundImage'
          className='z-0 object-cover'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='container absolute bottom-20 left-1/2 z-20 -translate-x-1/2'
        >
          <Title className=''>배경화면을 검색해보아요!</Title>
          <p className='clear-start mb-10 mt-1 text-center text-gray-700'>
            좋아하는 키워드를 검색하고 고품질의 이미지를 확인해보세요.
            <br />
            Pixabay API의 이미지를 검색합니다.
            <Link
              href='https://pixabay.com/ko/'
              className='ml-1 hover:underline hover:underline-offset-2'
            >
              Pixabay가 궁금하신가요?
            </Link>
          </p>
          <div className='flex w-full items-center justify-center'>
            <Input
              icon
              reset={() => reset({ searchKeyword: "" })}
              className=' w-[70%] rounded-full shadow-[0_1px_10px_0_rgba(32,33,36,0.1)]'
              name='searchKeyword'
              placeholder='원하는 이미지를 검색해보세요!'
              register={register("searchKeyword")}
            />
          </div>
        </form>
      </div>
      <div className='container mx-auto'>
        <List searchKeyword={"cloud"} />
      </div>
    </div>
  );
}
