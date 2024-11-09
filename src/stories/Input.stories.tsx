import { SigninProps } from "@/app/signin/page";
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
    label: {
      control: { type: "text" },
      description: "input 상단에 input의 이름을 표시할 수 있습니다.",
    },
    icon: {
      control: { type: "boolean" },
      description: "검색 아이콘을 표시할지 여부",
    },
    error: {
      control: { type: "text" },
      description: "입력 조건을 통과하지 못할시 나타나는 문장입니다.",
    },
    bgColor: {
      control: { type: "select" },
      options: ["white", "gray"],
      description: "input의 배경색을 변경합니다.",
    },
    reset: {
      control: { type: "boolean" },
      description: "리셋 버튼을 표시할지 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

// 기본 Header Input 스토리
export const BasicInput: StoryFn = (args) => {
  const { register, reset } = useForm();

  return (
    <Input
      {...args}
      register={register("username")}
      name='username'
      reset={args.reset ? () => reset({ username: "" }) : undefined}
    />
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
      name='username'
      register={register("username")}
      placeholder='사용자 이름을 입력하세요'
      label='사용자 이름'
      error='사용자 이름이 필요합니다'
      reset={() => reset({ username: "" })}
      icon={true}
    />
  );
};

// 모든 기능 활성화
export const WithAllOptions: StoryFn = (args) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninProps>();

  const onSubmit = () => {
    console.log("스토리북 input test");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
      <Input
        name='id'
        placeholder='아이디를 입력해주세요'
        register={register("id", {
          required: "아이디는 필수 입니다.",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: "아이디는 올바른 이메일 형식으로 입력해야 합니다.",
          },
        })}
        error={errors.id?.message}
        reset={() => reset({ id: "" })}
        icon={true}
        bgColor='gray'
      />
    </form>
  );
};
