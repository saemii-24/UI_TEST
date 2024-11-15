import { Meta, StoryFn } from "@storybook/react";
import Dropdown from "../components/Dropdown";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { searchProps } from "@/app/page";

const meta = {
  title: "Extra/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    backgrounds: {
      values: [{ name: "White", value: "#ffffff" }],
      default: "White",
    },
  },
  argTypes: {
    localSearchKeyword: {
      control: { type: "object" },
      description: "현재 표시되는 검색 키워드 목록",
    },
    setValue: {
      control: false,
      description: "searchKeyword를 설정하는 react-hook-form의 setValue 함수",
    },
    onRemove: {
      action: "removed",
      description: "키워드 삭제 시 호출되는 콜백 함수",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

export const Default: StoryFn<typeof Dropdown> = (args) => {
  const { setValue } = useForm<searchProps>();
  const [keywords, setKeywords] = useState<string[]>(args.localSearchKeyword);

  const handleRemove = (keyword: string) => {
    setKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  return (
    <div className='relative '>
      <Dropdown
        {...args}
        localSearchKeyword={keywords}
        setValue={setValue}
        onRemove={handleRemove}
      />
    </div>
  );
};

Default.args = {
  localSearchKeyword: ["React", "Storybook", "Dropdown"],
};
