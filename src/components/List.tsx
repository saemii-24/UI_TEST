import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { ImageListProps } from "@/types/type";
import { useInView } from "react-intersection-observer";

const List = () => {
  const [currentData, setCurrentData] = useState<ImageListProps[]>([]);
  const { ref, inView, entry } = useInView({ threshold: 0 });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async ({ pageParam = 1 }: { pageParam: number }) => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo&page=${pageParam}`;

    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error("응답 도중 오류가 발생했습니다.");
    }
    const data = await response.json();

    //  현재 페이지가 없기 때문에 직접 관리함
    return { ...data, currentPage: pageParam };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["ImageList"],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // console.log(lastPage);
      const maxPages = Math.ceil(lastPage.totalHits / 20); // 페이지 수 계산
      const nextPage = lastPage.currentPage + 1;

      // 다음 페이지가 있을 경우 nextPage 반환, 없으면 undefined 반환
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
      const fetchNow = data.pages[data.pages.length - 1].hits;
      setCurrentData((prev) => [...prev, ...fetchNow]);
    }
  }, [data]);

  return (
    <div>
      <div className='mt-7 columns-2 space-y-6 px-2 md:columns-4 md:px-5 lg:col-span-4 xl:col-span-5'>
        {currentData.map((item: ImageListProps, index: number) => {
          return (
            <div key={index}>
              <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:rounded-3xl before:opacity-50 hover:before:bg-gray-600'>
                <Image
                  src={item.webformatURL}
                  alt={item.user}
                  width={500}
                  height={500}
                  className='relative z-0 cursor-pointer rounded-3xl'
                />
              </div>
            </div>
          );
        })}
      </div>
      <div ref={ref} className='h-4 w-full bg-red-100'></div>
    </div>
  );
};

export default List;
