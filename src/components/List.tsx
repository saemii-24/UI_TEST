import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { ImageListProps } from "@/types/type";
import { useInView } from "react-intersection-observer";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword }: ListProps) => {
  const [currentData, setCurrentData] = useState<ImageListProps[]>([]);
  const { ref, inView } = useInView({ threshold: 0 });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async ({ pageParam = 1 }: { pageParam: number }) => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo&page=${pageParam}`;

    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error("응답 도중 오류가 발생했습니다.");
    }
    const data = await response.json();

    return { ...data, currentPage: pageParam };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["ImageList"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const maxPages = Math.ceil(lastPage.totalHits / 20);
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    if (data) {
      const allImages = data.pages.flatMap((page) => page.hits);
      setCurrentData(allImages);
    }
  }, [data]);

  // 이미지를 3개의 컬럼으로 분배하는 로직
  const columns = [[], [], []]; // 3개의 배열로 분배할 준비
  currentData.forEach((item, index) => {
    columns[index % 3].push(item); // 인덱스에 따라 3개의 배열로 나눔
  });

  return (
    <div className='mx-auto max-w-[1300px]'>
      <div className='flex space-x-6'>
        {/* 첫 번째 컬럼 */}
        <div className='flex-1 space-y-6'>
          {columns[0].map((item: ImageListProps) => (
            <div key={item.id} className='relative'>
              <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
                <Image
                  src={item.webformatURL}
                  alt={item.user}
                  width={500}
                  height={500}
                  className='relative z-0 cursor-pointer'
                />
              </div>
            </div>
          ))}
        </div>
        {/* 두 번째 컬럼 */}
        <div className='flex-1 space-y-6'>
          {columns[1].map((item: ImageListProps) => (
            <div key={item.id} className='relative'>
              <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
                <Image
                  src={item.webformatURL}
                  alt={item.user}
                  width={500}
                  height={500}
                  className='relative z-0 cursor-pointer'
                />
              </div>
            </div>
          ))}
        </div>
        {/* 세 번째 컬럼 */}
        <div className='flex-1 space-y-6'>
          {columns[2].map((item: ImageListProps) => (
            <div key={item.id} className='relative'>
              <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
                <Image
                  src={item.webformatURL}
                  alt={item.user}
                  width={500}
                  height={500}
                  className='relative z-0 cursor-pointer'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={ref} className='h-4 w-full bg-red-100'></div>
    </div>
  );
};

export default List;
