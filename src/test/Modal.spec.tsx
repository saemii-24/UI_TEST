import ImageCard from "@/components/ImageCard";
import { cleanup, fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { mockImageData } from "./mockdata";
import userEvent from "@testing-library/user-event";
import Modal from "@/components/Modal";

describe("Modal 테스트", () => {
  it("사용자가 클릭 후 모달이 DOM에 추가되는지 확인한다.", async () => {
    // ImageCard 컴포넌트를 렌더링하고, 모달은 아직 렌더링되지 않음
    const { queryByTestId, getByTestId } = render(
      <ImageCard imageList={mockImageData[0]} />,
    );

    // 모달이 DOM에 없다면, 모달은 ImageCard 내부에서 조건부로 렌더링되므로 처음엔 존재하지 않음
    const modal = queryByTestId("image-modal"); //query를 사용할 경우 찾지 못하더라도 에러를 반환하지 않음
    expect(modal).not.toBeInTheDocument();

    // 이미지 카드 클릭 이벤트 발생
    const imageCard = getByTestId("image-card");
    fireEvent.click(imageCard); // 클릭 이벤트 트리거

    // 클릭 후 모달이 DOM에 추가되었는지 확인
    await waitFor(() => {
      expect(screen.queryByTestId<HTMLDivElement>("image-modal")).toBeInTheDocument();
    });
  });
  it("사용자가 모달 Close 버튼을 클릭할 때 모달이 닫힌다.", () => {});
  it("사용자가 ESC키를 눌렀을 때 모달이 닫힌다.", () => {});
  it("모달 외부를 클릭하면 모달이 닫힌다.", () => {});
  it("사용자가 좋아요를 눌렀을 때 색상이 적절히 변경된다.", () => {});
  it("사용자가 다운로드 버튼을 클릭하면 해당 url의 새로운 창이 열린다.", () => {});
  it("사용자가 공유 버튼을 클릭하면 해당 url이 복사된다.", () => {});
});
