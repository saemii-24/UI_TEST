import React from "react";

const Loading = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='size-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600'></div>
    </div>
  );
};

export default Loading;
