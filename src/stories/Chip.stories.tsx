import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Chip from "../components/Chip";

const meta = {
  title: "Extra/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    backgrounds: {
      values: [{ name: "White", value: "#ffffff" }],
      default: "White",
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "텍스트",
    },
    onRemove: { action: "clicked" },
  },
} satisfies Meta<typeof Chip>;

export default meta;

export const Default: StoryFn<typeof Chip> = () => {
  const [keywords, setKeywords] = useState<string[]>([
    "React",
    "JavaScript",
    "Storybook",
  ]);

  const handleRemove = (keyword: string) => {
    setKeywords((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
  };

  return (
    <div className='flex gap-2'>
      {keywords.map((keyword) => (
        <Chip key={keyword} onRemove={handleRemove}>
          {keyword}
        </Chip>
      ))}
    </div>
  );
};
