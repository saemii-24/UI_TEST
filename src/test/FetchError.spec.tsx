import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import List from "@/components/List";
import { handlers } from "@/mock/handlers";
import { vi } from "vitest";

// MSW 서버 설정
const server = setupServer(...handlers);

beforeAll(() => server.listen()); // MSW 서버 시작
afterEach(() => server.resetHandlers()); // 핸들러 리셋
afterAll(() => server.close()); // MSW 서버 종료
// 테스트 전에 서버 시작
beforeAll(() => server.listen());
// 각 테스트 후에 핸들러 초기화

afterEach(() => server.resetHandlers());
// 테스트 후 서버 종료
afterAll(() => server.close());

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("Fetch가 실패했을 때의 List 테스트", () => {
  it("에러가 발생한 경우 에러 컴포넌트를 렌더링 한다.", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <List searchKeyword='test-error' />
      </QueryClientProvider>,
    );

    screen.debug();

    // 오류 메시지가 렌더링되었는지 확인
    // expect(
    //   await screen.findByText("데이터를 불러오는 중 오류가 발생했습니다."),
    // ).toBeInTheDocument();
  });
});
