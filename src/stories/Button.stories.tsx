import { Meta, StoryObj } from "@storybook/react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useState } from "react";
import Button from "../components/Button"; // Button 컴포넌트 경로
import React from "react";

const meta = {
  title: "Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      values: [{ name: "Gray", value: "#f8f8f8" }],
      default: "Gray",
    },
  },
  argTypes: {
    // control을 사용자가 변경 불가능하게 만들 수 있다.
    // rounded: {
    //   control: false,
    // },
    // Button 컴포넌트의 기본 props 설정
    children: { control: "text" },
    rounded: { control: "select", options: ["full", "lg"] },
    //추가 props
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "버튼",
    rounded: "full",
  },
};

export const LikeButton: Story = {
  args: {
    children: "Like", // 기본 children 값 설정
    rounded: "lg", // 기본 rounded 값 설정
  },
  render: () => {
    const [like, setLike] = useState(false);

    return (
      <Button
        rounded='lg'
        onClick={() => {
          setLike(!like);
        }}
      >
        <div className='center-flex gap-1'>
          {like ? (
            <RiHeart3Fill className='text-lg' />
          ) : (
            <RiHeart3Line className='text-lg' />
          )}
          <div>100</div>
        </div>
      </Button>
    );
  },
};
