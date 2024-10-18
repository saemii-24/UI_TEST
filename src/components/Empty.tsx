import React from "react";

interface EmptyState {
  searchKeyword: string;
}

const Empty = ({ searchKeyword }: EmptyState) => {
  return <div>{searchKeyword}에 대한 이미지가 없습니다.</div>;
};

export default Empty;
