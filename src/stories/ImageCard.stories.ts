import type { Meta, StoryObj } from "@storybook/react";
import ImageCard from "@/components/ImageCard";
import { mockImageData } from "@/test/mockdata";

const meta = {
  title: "Public/ImageCard",
  component: ImageCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageList: mockImageData[0],
  },
};
export const NoneUserInfo: Story = {
  args: {
    imageList: mockImageData[1],
  },
};
