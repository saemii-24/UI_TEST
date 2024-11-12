import { fireEvent, render, waitFor, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockImageData } from "./mockdata";
import { create } from "zustand";
import { ImageListProps } from "@/types/type";
import {
  ModalImageId,
  resetModalImageStore,
  mockModalImageIdStore,
} from "@/store/mockModalImageIdStore";
import ImageCard from "@/components/ImageCard";
import useModalImageId from "@/store/modalImageIdStore";

describe("Modal 컴포넌트 테스트", () => {
  it("zustand 최초 데이터는 modalImage가 undefined이다.", () => {
    // 상태를 리셋하여 기본 상태로 초기화
    resetModalImageStore();

    // 상태를 가져와서 초기 상태 검증
    const store = useModalImageId.getState();
    expect(store.modalImage).toEqual(undefined);
  });
  it("ImageCard 클릭 시 store에 해당 imageCard의 데이터가 저장되어야 한다", async () => {
    resetModalImageStore(); // 초기 상태로 설정

    // 상태를 가져와서 초기 상태 검증
    const firstStore = useModalImageId.getState();
    expect(firstStore.modalImage).toEqual(undefined);

    const { getByTestId } = render(<ImageCard imageList={mockImageData[0]} />);
    const user = userEvent.setup();

    await user.click(getByTestId("image-card")); // 상태 업데이트가 완료될 때까지 기다림

    const updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(mockImageData[0]);
  });

  // it("사용자가 모달 Close 버튼을 클릭할 때 모달이 닫힌다.", () => {});

  // it("사용자가 ESC키를 눌렀을 때 모달이 닫힌다.", () => {});

  // it("모달 외부를 클릭 시 모달이 닫히는지 확인한다", () => {});

  // it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {});

  // it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {});

  // it("사용자가 공유 버튼을 클릭하면 해당 url이 복사된다.", async () => {});
});
