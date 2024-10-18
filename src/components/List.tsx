import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import type { ImageListProps } from "@/types/type"; // Assuming ImageListProps is correctly defined elsewhere
import ImageCard from "./ImageCard";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword }: ListProps) => {
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

  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
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
    refetch();
  }, [searchKeyword]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

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
      {isLoading && <div>Loading...</div>} {/* Loading State */}
      {isError && <div>{error.message}</div>} {/* Error State */}
      {columns &&
        columns.map((column, columnIndex) => (
          <div key={columnIndex} className='flex-1 space-y-6'>
            <ImageCard imageList={column} />
          </div>
        ))}
      {columns.every((column) => column.length === 0) && (
        <div className='py-4 text-center'>이미지가 없습니다.</div>
      )}
      <div ref={ref} className='h-4 w-full bg-red-100'></div>
    </div>
  );
};

export default List;
