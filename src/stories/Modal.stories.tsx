import { Meta, StoryObj } from "@storybook/react";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import { mockImageData } from "../../tests/mockdata";
import useModalImageId from "@/store/modalImageIdStore";

const MockStoreDecorator = ({ children }: { children: React.ReactNode }) => {
  const { setModalImage } = useModalImageId();

  // Storybook 환경에서 modalImage 상태 초기화
  useEffect(() => {
    setModalImage(mockImageData[0]);
  }, [setModalImage]);

  return <>{children}</>;
};

// Story 설정
const meta = {
  title: "Public/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <MockStoreDecorator>
        <Story />
      </MockStoreDecorator>
    ),
  ],

  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 Story
export const Default: Story = {
  args: {
    isLike: false,
  },
};
