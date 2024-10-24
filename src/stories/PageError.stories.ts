import PageError from "@/components/PageError";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Notice/PageError",
  component: PageError,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
