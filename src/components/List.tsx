import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import { ImageListProps } from "@/types/type";

interface ListProps {
  searchKeyword: string;
}

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

  const fetchData = async ({ pageParam = 1 }) => {
    const perPage = 10; // 페이지당 데이터 개수 설정
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchKeyword)}&page=${pageParam}&per_page=${perPage}`,
    );

    const data = await response.json();
    return { data: data.hits, total: data.total };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["ImageList", searchKeyword],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.length * 20; // 현재까지 가져온 아이템 수 계산
      return currentTotal < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  // 각 ref가 inView일 때 이미지 로드
  useEffect(() => {
    if (inView1 && hasNextPage && data) {
      fetchNextPage();
      const nowIndex = data.pageParams[data.pageParams.length - 1] as number;
      const nowData = data.pages[nowIndex - 1].data;
      // console.log(nowData);
      const addNewData = images1.concat(nowData);
      setImages1(addNewData);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2 && hasNextPage && data) {
      fetchNextPage();
      const nowIndex = data.pageParams[data.pageParams.length - 1] as number;
      const nowData = data.pages[nowIndex - 1].data;
      // console.log(nowData);
      const addNewData = images2.concat(nowData);
      setImages2(addNewData);
    }
  }, [inView2]);

  useEffect(() => {
    if (inView3 && hasNextPage && data) {
      fetchNextPage();
      const nowIndex = data.pageParams[data.pageParams.length - 1] as number;
      const nowData = data.pages[nowIndex - 1].data;
      // console.log(nowData);
      const addNewData = images3.concat(nowData);
      setImages3(addNewData);
    }
  }, [inView3]);

  useEffect(() => {
    if (inView4 && hasNextPage && data) {
      fetchNextPage();
      const nowIndex = data.pageParams[data.pageParams.length - 1] as number;
      const nowData = data.pages[nowIndex - 1].data;
      // console.log(nowData);
      const addNewData = images4.concat(nowData);
      setImages4(addNewData);
    }
  }, [inView1]);

  return (
    <div className='mx-auto flex max-w-[1920px] gap-4'>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images1} />
        <div ref={ref1} className='h-20 w-full bg-red-400'></div>
      </div>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images2} />
        <div ref={ref2} className='h-20 w-full bg-yellow-400'></div>
      </div>
      <div className='flex w-full flex-col space-y-6'>
        <ImageList images={images3} />
        <div ref={ref3} className='h-20 w-full bg-green-400'></div>
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
