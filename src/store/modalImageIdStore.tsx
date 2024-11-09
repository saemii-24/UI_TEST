import { ImageListProps } from "@/types/type";
import { create } from "zustand";

interface ModalImageId {
  modalImage: Partial<ImageListProps> | undefined;
  setModalImage: (value: Partial<ImageListProps> | undefined) => void;
}

const useModalImageId = create<ModalImageId>((set) => ({
  modalImage: undefined,
  setModalImage: (value: Partial<ImageListProps> | undefined) =>
    set({ modalImage: value }),
}));

export default useModalImageId;
