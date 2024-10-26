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
      description: "에러 메시지가 있는 경우 표시됩니다.",
    },
    label: {
      control: { type: "text" },
      description: "레이블",
    },
    icon: {
      control: { type: "boolean" },
      description: "검색 아이콘을 표시할지 여부",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

// 기본 Header Input 스토리
export const BasicInput: StoryFn = (args) => {
  const { register } = useForm();

  return (
    <Input {...args} register={register} name='basic' placeholder='내용을 입력하세요' />
  );
};

// 일반 필드, 레이블과 검색 아이콘 포함
export const WithLabelAndIcon = BasicInput.bind({});
WithLabelAndIcon.args = {
  name: "username",
  label: "사용자 이름",
  placeholder: "사용자 이름을 입력하세요",
  icon: true,
};

// 에러 메시지와 리셋 버튼 포함
export const WithErrorAndReset: StoryFn = (args) => {
  const { register, reset } = useForm();

  return (
    <Input
      {...args}
      register={register}
      name='username'
      placeholder='사용자 이름을 입력하세요'
      label='사용자 이름'
      error='사용자 이름이 필요합니다'
      resetField={() => reset({ username: "" })}
      icon={true}
    />
  );
};

// 모든 기능 활성화
export const WithAllOptions: StoryFn = (args) => {
  const { register, reset } = useForm();

  return (
    <Input
      {...args}
      register={register}
      name='id'
      placeholder='아이디를 입력하세요'
      label='아이디'
      error='아이디는 8자에서 16자 사이여야 합니다'
      resetField={() => reset({ id: "" })}
      icon={true}
    />
  );
};
