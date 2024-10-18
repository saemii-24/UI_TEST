import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockImageData } from "./mockdata";
import ImageCard from "@/components/ImageCard";
import { ImageListProps } from "@/types/type";

const fetch = vi.fn();

const createFetchResponse = (data: ImageListProps[]) => ({
  json: () => Promise.resolve(data),
});

describe("ImageCard 컴포넌트 테스트", () => {
  // 매번 테스트 전에 fetch mock 리셋
  beforeEach(() => {
    fetch.mockReset();
  });

  it("fetch가 성공했을 때, 이미지 카드가 렌더링 된다.", async () => {
    // fetch mock 데이터를 설정
    fetch.mockResolvedValueOnce(createFetchResponse(mockImageData));

    // ImageCard 컴포넌트 렌더링
    render(<ImageCard imageList={mockImageData} />);

    // 이미지가 제대로 렌더링 되었는지 확인
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(mockImageData.length); // 이미지 갯수 확인

    // 유저 정보가 제대로 렌더링 되었는지 확인
    const user1 = screen.getByText("신짱구");
    const user2 = screen.getByText("김철수");
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  it("이미지 데이터가 없는 경우 '데이터 없음' 메시지가 표시된다", async () => {
    // 빈 배열을 응답으로 설정
    fetch.mockResolvedValueOnce(createFetchResponse([]));

    // ImageCard 컴포넌트 렌더링
    render(<ImageCard imageList={[]} />);

    // 이미지가 없는 경우의 메시지 확인
    const noDataMessage = screen.getByText("이미지가 없습니다.");
    expect(noDataMessage).toBeInTheDocument();
  });

  it("API 요청이 실패했을 때 에러 메시지가 렌더링된다", async () => {
    // fetch 실패를 mock 처리
    fetch.mockRejectedValueOnce(new Error("API 요청 실패"));

    // 에러 처리를 위해 fetchData 함수나 관련 코드를 호출하는 곳에서 에러 상태를 업데이트해야 함.
    render(<ImageCard imageList={[]} />);

    // 에러 메시지가 표시되는지 확인
    const errorMessage = await waitFor(() =>
      screen.getByText("데이터를 불러오는 중 오류가 발생했습니다."),
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
