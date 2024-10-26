"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import Chip from "@/components/Chip";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Dropdown from "@/components/Dropdown";
import List from "@/components/List";
import Header from "@/components/Header";

export interface searchProps {
  searchKeyword: string;
}

export default function Home() {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<searchProps>({});

  const [localSearchKeyword, setLocalSearchKeyword] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onSubmit: SubmitHandler<searchProps> = (data) => {
    const currentKeywords = localStorage.getItem("searchKeywords");
    const savedKeywords = currentKeywords ? JSON.parse(currentKeywords) : [];
    const updatedKeywords = [...savedKeywords, data.searchKeyword];
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
    setLocalSearchKeyword(data.searchKeyword); // 업데이트된 검색 키워드 설정
    setDropdownVisible(false); // 검색 후 드롭다운 숨기기
  };

  useEffect(() => {
    const savedKeywords = localStorage.getItem("searchKeywords");
    if (savedKeywords) {
      setLocalSearchKeyword(JSON.parse(savedKeywords));
    }
  }, []);

  // 기본 이미지 URL
  const [defaultImage, setDefaultImage] = useState<string>(
    "https://cdn.pixabay.com/photo/2019/11/11/07/49/hanok-4617481_1280.jpg",
  );

  return (
    <div className='min-h-screen w-full'>
      <div className='relative'>
        <Header />
        <div className='relative flex h-[320px] w-full items-center justify-center'>
          <Image
            src={defaultImage}
            fill
            alt='backgroundImage'
            className='z-0 object-cover'
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='container absolute bottom-10 left-1/2 -translate-x-1/2'
          >
            <Title className='z-20 mb-5'>배경화면을 검색해보아요!</Title>
            <Input
              className='w-full'
              name='searchKeyword'
              placeholder='원하는 이미지를 검색해보세요!'
              register={register}
            />
          </form>
        </div>
      </div>
      <List searchKeyword={localSearchKeyword} /> {/* 업데이트된 검색 키워드 전달 */}
    </div>
  );
}
