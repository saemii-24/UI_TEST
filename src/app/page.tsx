"use client";
import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Chip from "@/components/Chip";
import Input from "@/components/Input";
import Title from "@/components/Title";

export interface searchProps {
  searchKeyword: string;
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo`;

  const fetchData = async () => {
    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error("응답 도중 오류가 발생했습니다.");
    }
    return response.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["searchPicture"],
    queryFn: fetchData,
  });

  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<searchProps>();

  // submit할 경우 localStorage에 내용을 저장
  const onSubmit: SubmitHandler<searchProps> = (data) => {
    const currentKeywords = localStorage.getItem("searchKeywords");
    const savedKeywords = currentKeywords ? JSON.parse(currentKeywords) : [];

    // 문자열만 추가하도록 수정
    const updatedKeywords = [...savedKeywords, data.searchKeyword];
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));

    setLocalSearchKeyword(updatedKeywords);
  };

  // localStorage에서 초기 검색 키워드 로드
  const [localSearchKeyword, setLocalSearchKeyword] = useState<string[]>([]);
  useEffect(() => {
    const savedKeywords = localStorage.getItem("searchKeywords");
    if (savedKeywords) {
      setLocalSearchKeyword(JSON.parse(savedKeywords));
    }
  }, []);

  // 검색 키워드 삭제 로직
  const removeKeyword = (keywordToRemove: string) => {
    const updatedKeywords = localSearchKeyword.filter(
      (keyword) => keyword !== keywordToRemove,
    );
    setLocalSearchKeyword(updatedKeywords);
    localStorage.setItem("searchKeywords", JSON.stringify(updatedKeywords));
  };

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className='min-h-screen w-full'>
      <Title>배경화면을 검색해보아요!</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='searchKeyword'
          label='배경 검색'
          placeholder='검색어를 입력하세요'
          register={register}
        />
      </form>
      <div className='flex gap-4 flex-wrap ml-auto items-center justify-center'>
        {localSearchKeyword.map((keyword: string) => (
          <Chip key={keyword} onRemove={removeKeyword}>
            {keyword}
          </Chip>
        ))}
      </div>
    </div>
  );
}
