import Input from "@/components/Input";
import type { Meta, StoryFn } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

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
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
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

export const HeaderInput: StoryFn = (args) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Input
      {...args}
      register={register}
      name='basic'
      placeholder='내용을 입력하세요'
      type='header'
    />
  );
};

// HeaderInput story
export const WithLabel = HeaderInput.bind({});
WithLabel.args = {
  name: "usersname",
  label: "Username",
  placeholder: "Enter your username",
  type: "general",
};

// Story with a manually added error
export const WithError = HeaderInput.bind({});
WithError.args = {
  name: "username",
  label: "Username",
  placeholder: "Enter your username",
  type: "general",
  error: "Username is required", // Manually adding the error
};

export const WithAll = HeaderInput.bind({});
WithAll.args = {
  name: "id",
  label: "아이디",
  placeholder: "아이디를 입력해주세요.",
  type: "text",
  error: "아이디는 8자에서 16자 사이여야 합니다.", // Manually adding the error
};
