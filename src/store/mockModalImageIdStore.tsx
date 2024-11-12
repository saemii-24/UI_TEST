import { ImageListProps } from "@/types/type";
import useModalImageId from "./modalImageIdStore";
import { StoreApi } from "zustand";

//기존 타입과 동일
export interface ModalImageId {
  modalImage: Partial<ImageListProps> | undefined;
  setModalImage: (value: Partial<ImageListProps> | undefined) => void;
}

// 전달된 Zustand store 상태를 덮어쓰는 mock 함수
const mockStore = <T extends object>(hook: StoreApi<T>, state: Partial<T>) => {
  const initialState = hook.getState();
  hook.setState({ ...initialState, ...state }, true);
};

// 모킹된 함수
export const mockModalImageIdStore = (state: Partial<ModalImageId>) => {
  mockStore(useModalImageId, state);
};

// 리셋 함수
export const resetModalImageStore = () => {
  useModalImageId.setState({
    modalImage: undefined,
  });
};
