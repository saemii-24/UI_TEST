import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "@/components/Modal";
import useModalImageId from "@/store/modalImageIdStore";
import { mockImageData } from "./mockdata";

// store의 상태와 메서드를 모킹함
vi.mock("@/store/modalImageIdStore", () => ({
  default: () => ({
    modalImage: mockImageData[0],
    setModalImage: vi.fn(),
  }),
}));

describe("Modal 컴포넌트 테스트", () => {
  it("사용자가 모달 Close 버튼을 클릭할 때 모달이 닫힌다.", () => {
    const { getByTestId } = render(<Modal />);
    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  });

  it("사용자가 ESC키를 눌렀을 때 모달이 닫힌다.", () => {
    render(<Modal />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  });

  it("모달 외부를 클릭 시 모달이 닫히는지 확인한다", () => {
    const { getByTestId } = render(<Modal />);
    const background = getByTestId("image-modal");
    fireEvent.mouseDown(background);
    expect(useModalImageId().setModalImage).toHaveBeenCalledWith(undefined);
  });

  it("사용자가 좋아요를 눌렀을 때 fill 하트 아이콘으로 변경된다.", async () => {
    render(<Modal />);
    const likeButton = screen.getByRole("button", { name: /like/i });
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(screen.getByTestId("like-icon")).toHaveClass("text-red-500");
    });
  });

  it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {
    global.open = vi.fn();
    render(<Modal />);
    const downloadButton = screen.getByRole("button", { name: /다운로드/i });
    fireEvent.click(downloadButton);
    expect(global.open).toHaveBeenCalledWith(mockImageData[0].largeImageURL, "_blank");
  });

  it("사용자가 공유 버튼을 클릭하면 해당 url이 복사된다.", async () => {
    const mockClipboard = vi.fn();
    vi.spyOn(navigator.clipboard, "writeText").mockImplementation(mockClipboard);

    render(<Modal />);
    const shareButton = screen.getByRole("button", { name: /share/i });
    fireEvent.click(shareButton);
    await waitFor(() => {
      expect(mockClipboard).toHaveBeenCalledWith(mockImageData[0].largeImageURL);
    });
  });
});
