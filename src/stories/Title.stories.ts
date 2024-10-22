// Title.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Title from "@/components/Title";

const meta = {
  title: "Header/Title",
  component: Title,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      // values: [
      //   { name: "dark", value: "#000000" },
      //   { name: "light", value: "#FFFFFF" },
      // ],
    },
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "배경화면을 검색해보아요!",
  },
};
