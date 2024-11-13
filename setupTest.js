// setupTest.js
import "@testing-library/jest-dom";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup } from "@testing-library/react";
import { vi, afterEach, beforeEach } from "vitest";

//https://stackoverflow.com/questions/78954522/vitest-browser-mode-not-showing-anything

// import { setupServer } from "msw/node";
// import { handlers } from "./src/mock/handlers";

// 환경 변수 설정 (자동 cleanup 비활성화)
process.env.RTL_SKIP_AUTO_CLEANUP = "true";

// 각 테스트 전 DOM을 초기화
beforeEach(() => {
  cleanup();
});

afterEach(() => {
  // 각 테스트 후 별도 작업은 필요하지 않음
  return;
});

vi.mock("zustand");
// MSW 서버 설정
// const server = setupServer(...handlers);

// beforeAll(() => server.listen()); // MSW 서버 시작
// afterEach(() => server.resetHandlers()); // 핸들러 리셋
// afterAll(() => server.close()); // MSW 서버 종료

// 비동기 작업 및 mock 상태 초기화
afterEach(() => vi.clearAllMocks());
afterAll(() => vi.resetAllMocks());

// matchMedia를 mock으로 정의하여 CSS media queries 테스트 지원
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
