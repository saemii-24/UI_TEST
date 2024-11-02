// SigninForm.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import SigninForm from "@/components/SigninForm";

// 기본 meta 설정
const meta = {
  title: "Login/SigninForm",
  component: SigninForm,
  parameters: {
    layout: "centered",
    // backgrounds: {
    //   values: [{ name: "Gray", value: "#f8f8f8" }],
    //   default: "Gray",
    // },
  },
} satisfies Meta<typeof SigninForm>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    onSubmit: (data) => {
      console.log(data);
    },
  },
};
