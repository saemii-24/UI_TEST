import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  "center-flex h-12 border border-stone-300 px-6 py-4 font-medium transition hover:border-black",
  {
    variants: {
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
      },
      width: {
        full: "w-full",
        md: "w-md",
        fit: "w-fit",
      },
      color: {
        white: "bg-white text-black",
        blue: "border-none bg-blue-500 text-white transition hover:opacity-60",
      },
    },
    defaultVariants: {
      rounded: "full",
      width: "fit",
      color: "white",
    },
  },
);

const Button = ({
  children,
  rounded = "full",
  width = "fit",
  color = "white",
  className,
  ...props
}: {
  children: ReactNode;
  rounded?: "full" | "lg";
  width?: "full" | "md" | "fit";
  color?: "white" | "blue";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type='button'
      className={clsx(buttonStyles({ rounded, width, color }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
