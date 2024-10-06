"use client";

import { useQuery } from "@tanstack/react-query";

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

  if (isLoading) return <div>로딩중</div>;
  return (
    <div>
      <button className='bg-red-400 px-5 py-2'>이미지 불러오기</button>
    </div>
  );
}
