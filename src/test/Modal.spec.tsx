import { fireEvent, render, waitFor, screen, act } from "@testing-library/react";

import { mockImageData } from "./mockdata";
import { create } from "zustand";
import { ImageListProps } from "@/types/type";
import { ModalImageId, useModalImageId } from "@/store/mockModalImageIdStore";
import ImageCard from "@/components/ImageCard";

// Zustand 스토어 초기화 및 리셋 함수 설정
const storeResetFns = new Set<() => void>();

// store의 상태와 메서드를 모킹함
const createStore = () => {
  const store = create<ModalImageId>((set) => ({
    modalImage: mockImageData[0],
    setModalImage: (value: Partial<ImageListProps> | undefined) =>
      set({ modalImage: value }),
  }));

  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));

  return store;
};

beforeEach(() => {
  // 모든 스토어 리셋
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});

describe("Modal 컴포넌트 테스트", () => {
  it("mocking된 zustand 최초 데이터는 mockImageData[0]이다.", () => {
    const store = useModalImageId.getState();
    expect(store.modalImage).toEqual(mockImageData[0]);
  });

  it("ImageCard 클릭 시 Modal이 표시되어야 한다", async () => {
    const { getByTestId } = render(<ImageCard imageList={mockImageData[0]} />);
  });

  // it("사용자가 모달 Close 버튼을 클릭할 때 모달이 닫힌다.", () => {});

  // it("사용자가 ESC키를 눌렀을 때 모달이 닫힌다.", () => {});

  // it("모달 외부를 클릭 시 모달이 닫히는지 확인한다", () => {});

  // it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {});

  // it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {});

  // it("사용자가 공유 버튼을 클릭하면 해당 url이 복사된다.", async () => {});
});
