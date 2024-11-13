import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockImageData } from "./mockdata";
import { resetModalImageStore } from "@/store/mockModalImageIdStore";
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

    // const updateStore = useModalImageId.getState();
    // expect(updateStore.modalImage).toEqual(mockImageData[0]);
  });
});
