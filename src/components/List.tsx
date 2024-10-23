import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Error from "./Error";
import Empty from "./Empty";
import ImageCard from "./ImageCard";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword = "" }: ListProps) => {
  return (
    <div className='mx-auto flex max-w-[1920px] gap-4'>
      <ImageList searchKeyword={searchKeyword} />
      <ImageList searchKeyword={searchKeyword} />
      <ImageList searchKeyword={searchKeyword} />
      <ImageList searchKeyword={searchKeyword} />
    </div>
  );
};

export default List;
const ImageList = ({ searchKeyword }: { searchKeyword: string }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [imageData, setImageData] = useState([[], [], [], []]);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async ({ pageParam = 1 }: { pageParam: number }) => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=${searchKeyword}&image_type=photo&page=${pageParam}&per_page=16`;

    const response = await fetch(fetchURL);
    const data = await response.json();

    return { ...data, currentPage: pageParam };
  };

  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ["ImageList", searchKeyword],
      queryFn: fetchData,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const maxPages = Math.ceil(lastPage.totalHits / 16);
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    });

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // 모든 페이지의 hits 배열을 하나로 합치기
  const allHits = data?.pages.flatMap((page) => page.hits) || [];

  console.log("allHits", allHits);

  console.log(data?.pages[data?.pages.length - 1].hits);
  // useEffect(() => {
  //   if (!data) return;

  //   const groups = [[], [], [], []];

  //   for (let i = 0; i < data.length; i++) {
  //     const groupIndex = i % 4;
  //     groups[groupIndex].push(data[i]);
  //   }

  //   console.log(groups);
  // }, [data]);

  return (
    <div className='w-full space-y-6'>
      {allHits.length > 0 &&
        allHits.map((image, index) => (
          <div key={index}>
            <ImageCard imageList={image} />
          </div>
        ))}
      <div ref={ref} className='h-20 w-full bg-blue-400'></div>
    </div>
  );
};
