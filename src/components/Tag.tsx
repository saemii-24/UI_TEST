import React from "react";

interface TagProps {
  children: React.ReactNode;
}
const Tag = ({ children }: TagProps) => {
  return <div>{children}</div>;
};

export default Tag;
