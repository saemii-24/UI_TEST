import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import ErrorComponent from "./Error";
import { ImageListProps } from "@/types/type";
import Empty from "./Empty";
import Loading from "./Loading";
import useClickImageStore from "@/store/modalImageIdStore";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import useModalImageId from "@/store/modalImageIdStore";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword }: ListProps) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // 각 column에 사용하기 위한 ref 준비
  const { ref, inView } = useInView({ threshold: 0 });

  const { modalImage, setModalImage } = useModalImageId();

  // API 데이터를 페칭하는 함수
  const fetchData = async ({ pageParam = 1 }) => {
    const perPage = 10;
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchKeyword,
      )}&page=${pageParam}&per_page=${perPage}`,
    );
    if (!response.ok) {
      throw new Error("에러가 발생했습니다.");
    }

    const data = await response.json();

    return { data: data.hits, total: data.total };
  };

  // useInfiniteQuery를 사용해 무한 스크롤 처리
  const {
    data: images,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
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
    enabled: true,
    retry: false,
  });

  // Intersection Observer가 inView일 때 데이터 페칭
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  // 로딩 상태
  if (isLoading) {
    return <Loading />;
  }

  // 에러 발생 시
  if (isError) {
    return <ErrorComponent />;
  }

  // 데이터가 비어 있을 때
  if (images?.pages[0]?.data.length === 0) {
    return <Empty searchKeyword={searchKeyword} />;
  }

  return (
    <>
      {modalImage !== undefined && createPortal(<Modal />, document.body)}
      <div className='mx-auto max-w-[1920px]'>
        <div className='columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4'>
          {images?.pages.flatMap((page) =>
            page.data.map((image: Partial<ImageListProps>, index: number) => (
              <div key={image.id + "-" + index} className='mb-4 break-inside-avoid'>
                <ImageCard
                  imageList={image}
                  onClick={() => {
                    setModalImage(image);
                    console.log(modalImage);
                  }}
                />
              </div>
            )),
          )}
        </div>
        <div ref={ref} className='h-20 bg-red-400'></div>
      </div>
    </>
  );
};

export default List;
