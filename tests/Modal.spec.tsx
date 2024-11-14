import { render, screen } from "@testing-library/react";
//operty 'getByTestId' does not exist on type 'Screen'.ts 오류는 screen을 작성하지 않아서 그렇다.
import userEvent from "@testing-library/user-event";

import { mockImageData } from "./mockdata";
import {
  mockModalImageIdStore,
  resetModalImageStore,
} from "@/store/mockModalImageIdStore";
import ImageCard from "@/components/ImageCard";
import useModalImageId from "@/store/modalImageIdStore";
import Modal from "@/components/Modal";
import { vi } from "vitest";

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
    console.log(firstStore);

    const { getByTestId } = render(<ImageCard imageList={mockImageData[0]} />);
    const user = userEvent.setup();

    await user.click(getByTestId("image-card")); // 상태 업데이트가 완료될 때까지 기다림

    const updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(mockImageData[0]);
    console.log(updateStore);
  });
  it("Modal의 close버튼을 누르면 store가 undefined되어야 한다.", async () => {
    // 상태를 모킹하여 modalImage 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    // 상태를 가져와서 초기 상태 검증
    const firstStore = useModalImageId.getState();
    expect(firstStore.modalImage).toEqual(mockImageData[0]);

    const { getByTestId } = render(<Modal />);
    const closeBtn = getByTestId("close-button");

    const user = userEvent.setup();
    await user.click(closeBtn);

    const updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(undefined);
  });

  it("모달 외부를 클릭 시 store가 undefined되어야 한다.", async () => {
    // 상태를 모킹하여 modalImage 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });

    render(<Modal />);
    const background = screen.getByTestId("image-modal");
    const whiteBox = screen.getByRole("dialog"); // 모달 내부(화이트 박스) 요소

    const user = userEvent.setup();

    // 배경 클릭 시 모달이 닫혀야 함
    await user.click(background);
    let updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).toEqual(undefined);

    // 다시 모달 열기
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    // 화이트 박스를 클릭했을 때는 닫히지 않아야 함
    await user.click(whiteBox);
    updateStore = useModalImageId.getState();
    expect(updateStore.modalImage).not.toEqual(undefined);
  });

  it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {
    // modalImage 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    const likeButton = screen.getByTestId("like-button");
    const user = userEvent.setup();

    // 초기 아이콘 상태 확인 (빈 하트 아이콘)
    expect(screen.getByTestId("like-icon-line"));

    // 좋아요 버튼 클릭
    await user.click(likeButton);

    // 좋아요 상태가 변경되어 fill 하트 아이콘으로 변경됨
    expect(screen.getByTestId("like-icon-fill"));
  });

  it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {
    // modalImage 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    const downloadButton = screen.getByRole("link", { name: /다운로드/i });

    // 다운로드 버튼의 href 속성이 올바른 URL인지 확인
    expect(downloadButton).toHaveAttribute("href", mockImageData[0].largeImageURL);

    // 새 창이 열리는지 확인 (`target="_blank"`)
    expect(downloadButton).toHaveAttribute("target", "_blank");
  });

  it("사용자가 공유 버튼을 클릭하면 해당 URL이 복사된다.", async () => {
    // modalImage 설정
    mockModalImageIdStore({ modalImage: mockImageData[0] });
    render(<Modal />);

    const shareButton = screen.getByTestId("share-button");
    const user = userEvent.setup();

    // 공유 버튼 클릭
    await user.click(shareButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockImageData[0].largeImageURL,
    );
  });
});
