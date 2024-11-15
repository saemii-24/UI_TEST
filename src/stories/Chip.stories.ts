import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Chip from "../components/Chip";

const meta = {
  title: "Extra/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    backgrounds: {
      values: [{ name: "White", value: "#ffffff" }],
      default: "White",
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "텍스트",
    },
    onRemove: { action: "clicked" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "React",
    onRemove: () => {},
  },
};
