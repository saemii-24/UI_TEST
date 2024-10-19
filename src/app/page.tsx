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
  } = useForm<searchProps>();

  const searchKeyword = watch("searchKeyword");

  const onSubmit: SubmitHandler<searchProps> = (data) => {
    const currentKeywords = localStorage.getItem("searchKeywords");
    const savedKeywords = currentKeywords ? JSON.parse(currentKeywords) : [];
    const updatedKeywords = [...savedKeywords, data.searchKeyword];
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
    setLocalSearchKeyword(updatedKeywords);
    setDropdownVisible(false); // 검색 후 드롭다운 숨기기
  };

  const [localSearchKeyword, setLocalSearchKeyword] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const savedKeywords = localStorage.getItem("searchKeywords");
    if (savedKeywords) {
      setLocalSearchKeyword(JSON.parse(savedKeywords));
    }
  }, []);

  // 검색 키워드 삭제
  const removeKeyword = (keywordToRemove: string) => {
    const updatedKeywords = localSearchKeyword.filter(
      (keyword) => keyword !== keywordToRemove,
    );
    setLocalSearchKeyword(updatedKeywords);
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
  };

  //사용자의 검색 기록을 가지고, 추가 내용을 보여준다.
  //debounce 기능을 활용해 사용자가 특정 시간동안 입력이 없는경우 api를 호출한다.
  const [defaultImage, setDefaultImage] = useState<string>(
    "https://cdn.pixabay.com/photo/2019/11/11/07/49/hanok-4617481_1280.jpg",
  );

  return (
    <div className='min-h-screen w-full'>
      <div className='relative'>
        <Header />
        <div className='relative flex h-[60vh] w-full items-center justify-center'>
          {/* <div className='absolute inset-0 z-10 bg-white/40 backdrop-blur-md'></div> */}
          {/* <div className='absolute inset-0 z-10 bg-white/40 '></div> */}
          <Image
            src={defaultImage}
            fill
            alt='backgroundImage'
            className='z-0 object-cover'
          />
          <Title className='z-20 -mt-20'>배경화면을 검색해보아요!</Title>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='searchKeyword'
          // label='배경 검색'
          placeholder='원하는 이미지를 검색해보세요!'
          register={register}
        />
        {/* {localSearchKeyword.length > 0 && (
          <Dropdown
            localSearchKeyword={localSearchKeyword}
            setValue={setValue}
            onRemove={removeKeyword}
          />
        )} */}
      </form>

      <List searchKeyword={searchKeyword} />
    </div>
  );
}
