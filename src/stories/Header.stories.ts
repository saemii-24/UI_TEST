import Header from "@/components/Header";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Public/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    user: {
      control: { type: "text" },
    },
    status: {
      control: {
        type: "radio",
        options: ["login", "logout"],
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: "신짱구",
    status: "login",
  },
};

export const LoggedOut: Story = {
  args: {
    user: "게스트",
    status: "logout",
  },
};
