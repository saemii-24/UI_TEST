import { fireEvent, render, waitFor, screen, act } from "@testing-library/react";

import { mockImageData } from "./mockdata";
import { create } from "zustand";
import { ImageListProps } from "@/types/type";
import useModalImageId, { ModalImageId } from "@/store/modalImageIdStore";

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
  // it("사용자가 모달 Close 버튼을 클릭할 때 모달이 닫힌다.", () => {
  //   const imageCard = render(<ImageCard imageList={mockImageData[0]} />);
  //   // screen.debug();
  //   fireEvent.click(imageCard);
  //   expect.(<Modal/>).inTheDocument()
  //   // const { getByTestId } = render(<Modal />);
  //   // const closeButton = getByTestId("close-button");
  //   // fireEvent.click(closeButton);
  //   // expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  // });
  // it("ImageCard 클릭 시 Modal이 표시되어야 한다", async () => {
  //   const setModalImageMock = vi.fn();

  //   vi.mock("@/store/modalImageIdStore", () => ({
  //     default: () => ({
  //       modalImage: mockImageData[0],
  //       setModalImage: setModalImageMock,
  //     }),
  //   }));

  //   render(<ImageCard imageList={mockImageData[0]} />);

  //   const imageCard = screen.getByTestId("image-card");
  //   fireEvent.click(imageCard);

  //   await waitFor(() => {
  //     expect(setModalImageMock).toHaveBeenCalledTimes(1);
  //     // setModalImage 호출 후 모달이 렌더링되는지 확인
  //     expect(screen.getByTestId("image-modal")).toBeInTheDocument();
  //   });
  // });
  // 테스트 예시

  it("zustand 최조는 mockImageData[0]이다.", () => {
    const store = useModalImageId.getState();
    expect(store.modalImage).toEqual(mockImageData[0]);
  });

  // it("사용자가 ESC키를 눌렀을 때 모달이 닫힌다.", () => {
  //   render(<Modal />);
  //   fireEvent.keyDown(window, { key: "Escape" });
  //   expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  // });

  // it("모달 외부를 클릭 시 모달이 닫히는지 확인한다", () => {
  //   const { getByTestId } = render(<Modal />);
  //   const background = getByTestId("image-modal");
  //   fireEvent.mouseDown(background);
  //   expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  // });

  // it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {
  //   render(<Modal />);
  //   const likeButton = screen.getByRole("button", { name: /like/i });
  //   fireEvent.click(likeButton);
  //   await waitFor(() => {
  //     expect(screen.getByTestId("like-icon")).toHaveClass("text-red-500");
  //   });
  // });

  // it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {
  //   global.open = vi.fn();
  //   render(<Modal />);
  //   const downloadButton = screen.getByRole("button", { name: /다운로드/i });
  //   fireEvent.click(downloadButton);
  //   expect(global.open).toHaveBeenCalledWith(mockImageData[0].largeImageURL, "_blank");
  // });

  // it("사용자가 공유 버튼을 클릭하면 해당 url이 복사된다.", async () => {
  //   const mockClipboard = vi.fn();
  //   vi.spyOn(navigator.clipboard, "writeText").mockImplementation(mockClipboard);

  //   render(<Modal />);
  //   const shareButton = screen.getByRole("button", { name: /share/i });
  //   fireEvent.click(shareButton);
  //   await waitFor(() => {
  //     expect(mockClipboard).toHaveBeenCalledWith(mockImageData[0].largeImageURL);
  //   });
  // });
});
