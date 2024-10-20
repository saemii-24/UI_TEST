import Empty from "@/components/Empty";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Notice/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    searchKeyword: "이미지 검색 입력어",
    className: "",
  },
};
