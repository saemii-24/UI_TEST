import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import ErrorComponent from "./Error";
import { ImageListProps } from "@/types/type";
import Empty from "./Empty";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword }: ListProps) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // 각 column에 사용하기 위한 ref를 준비함
  const { ref, inView } = useInView({ threshold: 0 });
  const [images, setImages] = useState<ImageListProps[]>([]);

  const fetchData = async ({ pageParam = 1 }) => {
    const perPage = 10;

    // const response = await fetch(
    //   `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchKeyword)}&page=${pageParam}&per_page=${perPage}`,
    // );
    const response = await fetch(
      `https://pixabay.com/api/?key=${123}&q=${encodeURIComponent(searchKeyword)}&page=${pageParam}&per_page=${perPage}`,
    );

    if (response.status != 200) {
      throw new Error("에러가 발생했습니다.");
    }

    const data = await response.json();
    return { data: data.hits, total: data.total };
  };

  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery({
    queryKey: ["ImageList", searchKeyword],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce(
        (acc, page) => acc + (page?.data.length || 0),
        0,
      );
      return currentTotal < lastPage?.total ? allPages.length + 1 : undefined;
    },
  });

  console.log(isError);
  if (isError) {
    return <ErrorComponent />;
  }
  return (
    <div className='mx-auto max-w-[1920px] px-4'>
      <div className='columns-4 gap-4'>
        {images.map((image, index) => (
          <div key={index} className='mb-4 break-inside-avoid'>
            <ImageCard imageList={image} />
          </div>
        ))}
        <div ref={ref} className='h-20'></div>
      </div>
    </div>
  );
};

export default List;
