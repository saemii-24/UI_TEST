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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<searchProps>();

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
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);

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
    </div>
  );
}
