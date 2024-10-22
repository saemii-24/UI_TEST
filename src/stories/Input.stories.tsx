import { searchProps } from "@/app/page";
import Input from "@/components/Input";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Header/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#333333" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "사용자에게 기본으로 보여질 문구를 입력합니다.",
    },
    error: {
      control: { type: "text" },
      description: "에러 메세지가 있는 경우, 에러를 보여줍니다.",
    },
    label: {
      control: { type: "text" },
      description: "레이블",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Customizable: Story = {
  render: (args) => {
    const { register } = useForm<searchProps>(); // useForm을 사용하여 register 가져오기
    return <Input {...args} register={register} name='searchKeyword' />; // register와 name을 전달
  },
  args: {
    name: "searchKeyword",
    label: "사용자가 입력할 내용",
    placeholder: "여기에 입력하세요...",
    error: "",
    register: register,
  },
};
