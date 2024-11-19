import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
    // clipboard.writeText 메서드를 mock 함수로 대체
    const writeTextMock = jest.fn(() => Promise.resolve());

    // navigator.clipboard의 writeText 메서드를 모킹
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock, // writeText 모킹
      },
    });

    mockModalImageIdStore({ modalImage: mockImageData[0] });
    const { getByTestId } = render(<Modal />);

    const user = userEvent.setup();

    // 공유 버튼 클릭
    const shareButton = getByTestId("share-button"); // 공유 버튼이 포함된 요소
    await user.click(shareButton);

    // clipboard.writeText가 호출되었는지 확인
    expect(writeTextMock).toHaveBeenCalledWith(window.location.href); // URL 복사 여부 확인
  });
});
