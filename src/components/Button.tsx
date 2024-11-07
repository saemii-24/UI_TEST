import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

// cva 스타일 정의
const buttonStyles = cva(
  "center-flex h-12 border border-stone-300 px-6 py-4 transition hover:border-black",
  {
    variants: {
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      rounded: "full",
    },
  },
);

// Button 컴포넌트 정의
const Button = ({
  children,
  rounded = "full",
}: {
  children: ReactNode;
  rounded?: "full" | "lg";
}) => {
  return (
    <button type='button' className={buttonStyles({ rounded })}>
      {children}
    </button>
  );
};

export default Button;
