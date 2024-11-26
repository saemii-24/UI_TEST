import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import List from "@/components/List";
import { handlers } from "@/mock/handlers";
import { setupServer } from "msw/node";

// MSW 서버 설정
const server = setupServer(...handlers);
const queryClient = new QueryClient();

beforeAll(() => server.listen()); // MSW 서버 시작
afterEach(() => server.resetHandlers()); // 핸들러 리셋
afterAll(() => server.close()); // MSW 서버 종료

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("Fetch가 실패했을 때의 List 테스트", () => {
  it("fetch 중 에러가 발생했을 때 ErrorComponent가 렌더링 된다.", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <List searchKeyword='error' />
      </QueryClientProvider>,
    );

    // 5초 대기 후 오류 메시지 확인
    await waitFor(
      async () => {
        expect(
          await screen.findByText("데이터를 불러오는 중 오류가 발생했습니다."),
        ).toBeInTheDocument();
      },
      { timeout: 5000 }, // 5초 대기 설정
    );
    screen.debug();
  });

  it("해당 검색 키워드에 대한 결과값이 없으면 empty 컴포넌트가 렌더링된다.", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <List searchKeyword='empty' />
      </QueryClientProvider>,
    );

    // 검색결과가 없다는 안내 메세지가 렌더링되었는지 확인
    await waitFor(
      async () => {
        expect(
          await screen.findByText("empty에 대한 검색 결과가 없습니다."),
        ).toBeInTheDocument();
      },
      { timeout: 5000 }, // 5초 대기 설정
    );
    screen.debug();
  });
});
