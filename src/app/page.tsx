"use client";

import Input from "@/components/Input";
import Title from "@/components/Title";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

export interface searchProps {
  searchKeyword: string;
}

export default function Home() {
  // 환경 변수 불러오기
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

  const onSubmit: SubmitHandler<searchProps> = (data) => console.log(data);

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className='min-h-screen w-full bg-blue-100'>
      <button className='bg-red-400 px-5 py-2'>이미지 불러오기</button>
      <Title>배경화면을 검색해보아요!</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='searchKeyword'
          label='배경 검색'
          placeholder='검색어를 입력하세요'
          register={register}
          // error={errors.backgroundSearch?.message}
        />
      </form>
    </div>
  );
}
