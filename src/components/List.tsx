import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import type { ImageListProps } from "@/types/type"; // Assuming ImageListProps is correctly defined elsewhere

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword = "꽃" }: ListProps) => {
  const [columns, setColumns] = useState<ImageListProps[][]>([[], [], []]);
  const { ref, inView } = useInView({ threshold: 0 });
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async ({ pageParam = 1 }: { pageParam: number }) => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=${searchKeyword}&image_type=photo&page=${pageParam}&per_page=30`;

    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error("응답 도중 오류가 발생했습니다.");
    }
    const data = await response.json();

    return { ...data, currentPage: pageParam };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["ImageList", searchKeyword],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const maxPages = Math.ceil(lastPage.totalHits / 30);
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log(data);

  useEffect(() => {
    if (data) {
      const allImages = data.pages.flatMap((page) => page.hits);
      const newColumns: ImageListProps[][] = [[], [], []];

      allImages.forEach((image: ImageListProps, index: number) => {
        newColumns[index % 3].push(image);
      });

      setColumns((prevColumns) => [
        [...prevColumns[0], ...newColumns[0]],
        [...prevColumns[1], ...newColumns[1]],
        [...prevColumns[2], ...newColumns[2]],
      ]);
    }
  }, [data]);

  return (
    <div className='mx-auto max-w-[1300px]'>
      <div className='flex space-x-6'>
        {columns &&
          columns.map((column, columnIndex) => (
            <div key={columnIndex} className='flex-1 space-y-6'>
              <ImageColumn imageList={column} />
            </div>
          ))}
      </div>
      <div ref={ref} className='h-4 w-full bg-red-100'></div>
    </div>
  );
};

export default List;

const ImageColumn = ({ imageList }: { imageList: ImageListProps[] }) => {
  return (
    <>
      {imageList.map((item: ImageListProps) => (
        <div key={item.id} className='relative'>
          <div className='relative cursor-pointer before:absolute before:z-10 before:size-full before:opacity-50 hover:before:bg-gray-600'>
            <Image
              src={item.previewURL}
              alt={item.user}
              width={500}
              height={500}
              className='relative z-0 cursor-pointer'
            />
          </div>
        </div>
      ))}
    </>
  );
};
