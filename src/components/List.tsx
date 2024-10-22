import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Error from "./Error";
import Empty from "./Empty";

interface ListProps {
  searchKeyword: string;
}

const List = ({ searchKeyword = "" }: ListProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async ({ pageParam = 1 }: { pageParam: number }) => {
    const fetchURL = `https://pixabay.com/api/?key=${apiKey}&q=${searchKeyword}&image_type=photo&page=${pageParam}&per_page=1`;

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

  if (isError) {
    return (
      <>
        <Empty searchKeyword='어쩌고' />
        <Error />
      </>
    );
  }

  return (
    <div className='mx-auto max-w-[1300px]'>
      <div></div>
    </div>
  );
};

export default List;
