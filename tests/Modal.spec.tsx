import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockImageData } from "./mockdata";
import {
  mockModalImageIdStore,
  resetModalImageStore,
} from "@/store/mockModalImageIdStore";
import ImageCard from "@/components/ImageCard";
import useModalImageId from "@/store/modalImageIdStore";
import Modal from "@/components/Modal";

describe("Modal 컴포넌트 테스트", () => {
  beforeEach(() => {
    resetModalImageStore(); // 상태 리셋
  });

  it("zustand 최초 데이터는 modalImage가 undefined이다.", () => {
    const store = useModalImageId.getState();
    expect(store.modalImage).toEqual(undefined);
  });

  it("ImageCard 클릭 시 store에 해당 imageCard의 데이터가 저장되어야 한다", async () => {
    const firstStore = useModalImageId.getState();
    expect(firstStore.modalImage).toEqual(undefined);

    const { getByTestId } = render(<ImageCard imageList={mockImageData[0]} />);
    const user = userEvent.setup();

    await user.click(getByTestId("image-card"));

    const updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(mockImageData[0]);
  });

  it("Modal의 close버튼을 누르면 store가 undefined되어야 한다.", async () => {
    mockModalImageIdStore({ modalImage: mockImageData[0] });

    const { getByTestId } = render(<Modal />);
    const closeBtn = getByTestId("close-button");

    const user = userEvent.setup();
    await user.click(closeBtn);

    const updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(undefined);
  });

  it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    const likeButton = screen.getByTestId("like-button");
    const user = userEvent.setup();

    expect(screen.getByTestId("like-icon-line"));

    await user.click(likeButton);

    expect(screen.getByTestId("like-icon-fill"));
  });

  it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    const downloadButton = screen.getByRole("link", { name: /다운로드/i });

    expect(downloadButton).toHaveAttribute("href", mockImageData[0].largeImageURL);
    expect(downloadButton).toHaveAttribute("target", "_blank");
  });
  it("사용자가 공유 버튼을 클릭하면 해당 URL이 복사된다.", async () => {
    // alert를 mock 처리
    window.alert = jest.fn();

    Object.defineProperty(global.navigator, "clipboard", {
      value: {
        writeText: jest.fn(),
      },
      writable: true, // 이 속성을 true로 설정하여 수정 가능하도록 함
    });

    const writeTextMock = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    // mock 데이터 및 store 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });

    // Modal 컴포넌트 렌더링
    const { getByTestId } = render(<Modal />);

    const shareButton = getByTestId("share-button");
    fireEvent.click(shareButton); // 클릭 이벤트 발생

    // writeTextMock 호출 여부 검증
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(mockImageData[0].largeImageURL);
    });
    // console.log(mockImageData[0].largeImageURL);
  });
});
