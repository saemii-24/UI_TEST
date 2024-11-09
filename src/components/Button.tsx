import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

// cva 스타일 정의
const buttonStyles = cva(
  "center-flex h-12 border border-stone-300 bg-white px-6 py-4 font-medium transition hover:border-black",
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
  ...props
}: {
  children: ReactNode;
  rounded?: "full" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type='button' className={buttonStyles({ rounded })} {...props}>
      {children}
    </button>
  );
};

export default Button;
