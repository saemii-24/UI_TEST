import Error from "@/components/Error";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Notice/Error",
  component: Error,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
