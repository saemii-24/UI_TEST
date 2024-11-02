import type { Meta, StoryObj } from "@storybook/react";
import SNS from "@/components/SNS";

const meta = {
  title: "Login/SNS",
  component: SNS,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    sns: {
      control: {
        type: "select",
        options: ["google", "naver", "kakao"],
      },
    },
  },
} satisfies Meta<typeof SNS>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SNSLogin: Story = {
  args: {
    sns: "google",
  },
};
