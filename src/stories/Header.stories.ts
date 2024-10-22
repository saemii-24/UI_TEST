import Header from "@/components/Header";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Header/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
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
    user: "김철수",
    status: "login",
  },
};

export const LoggedOut: Story = {
  args: {
    user: "게스트",
    status: "logout",
  },
};
