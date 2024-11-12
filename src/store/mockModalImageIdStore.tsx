import { mockImageData } from "@/test/mockdata";
import { ImageListProps } from "@/types/type";
import { create } from "zustand";

export interface ModalImageId {
  modalImage: Partial<ImageListProps> | undefined;
  setModalImage: (value: Partial<ImageListProps> | undefined) => void;
}

const useModalImageId = create<ModalImageId>((set) => ({
  modalImage: mockImageData[0],
  setModalImage: (value: Partial<ImageListProps> | undefined) =>
    set({ modalImage: value }),
}));

// store 초기화 함수
const resetModalImageStore = () => {
  useModalImageId.setState({
    modalImage: undefined, // 초기 상태로 설정
  });
};

export { useModalImageId, resetModalImageStore };
