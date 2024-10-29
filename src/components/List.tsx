import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import { ImageListProps } from "@/types/type";

interface ListProps {
  searchKeyword: string;
}

let pageParam = 1;

const List = ({ searchKeyword }: ListProps) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // 각 column에 사용하기 위한 ref를 갯수대로 준비함
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0 });

  //각 column에 저장하기 위한 state를 갯수대로 준비함
  const [images1, setImages1] = useState<ImageListProps[]>([]);
  const [images2, setImages2] = useState<ImageListProps[]>([]);
  const [images3, setImages3] = useState<ImageListProps[]>([]);
  const [images4, setImages4] = useState<ImageListProps[]>([]);

  const fetchData = async () => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=${searchKeyword}&image_type=photo&lang=ko&per_page=${3 * pageParam}`;
    const response = await fetch(fetchURL);
    const data = await response.json();

    return { ...data, currentPage: pageParam };
  };

  // 추가로 3개씩 이미지를 가져오는 infinite query
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["ImageList", searchKeyword, pageParam],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const maxPages = Math.ceil(lastPage.totalHits / 3);
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    enabled: !!searchKeyword, // searchKeyword가 있을 때만 쿼리 실행
  });

  // 각 ref가 inView일 때 이미지 로드
  useEffect(() => {
    if (inView1 && hasNextPage && data) {
      fetchNextPage();
      pageParam++;
      const newData = data.pages[data.pageParams.length - 1].hits.slice(-3);
      setImages1((prev) => [...prev, ...newData]);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2 && hasNextPage && data) {
      fetchNextPage();
      pageParam++;
      const newData = data.pages[data.pageParams.length - 1].hits.slice(-3);
      setImages2((prev) => [...prev, ...newData]);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView3 && hasNextPage && data) {
      fetchNextPage();
      pageParam++;
      const newData = data.pages[data.pageParams.length - 1].hits.slice(-3);
      setImages3((prev) => [...prev, ...newData]);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView4 && hasNextPage && data) {
      fetchNextPage();
      pageParam++;
      const newData = data.pages[data.pageParams.length - 1].hits.slice(-3);
      setImages4((prev) => [...prev, ...newData]);
    }
  }, [inView1]);

  return (
    <div className='mx-auto flex max-w-[1920px] gap-4'>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images1} />
        <div ref={ref1} className='h-20 w-full bg-blue-400'></div>
      </div>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images2} />
        <div ref={ref2} className='h-20 w-full bg-blue-400'></div>
      </div>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images3} />
        <div ref={ref3} className='h-20 w-full bg-blue-400'></div>
      </div>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images4} />
        <div ref={ref4} className='h-20 w-full bg-blue-400'></div>
      </div>
    </div>
  );
};

export default List;

interface ImageProps {
  images: Partial<ImageListProps>[];
}

const ImageList = ({ images }: ImageProps) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={index}>
          <ImageCard imageList={image} />
        </div>
      ))}
    </>
  );
};
