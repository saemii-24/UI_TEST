// setupTest.js
//https://stackoverflow.com/questions/78954522/vitest-browser-mode-not-showing-anything
import "@testing-library/jest-dom";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup } from "@testing-library/react";
import { vi, afterEach, beforeEach } from "vitest";

process.env.RTL_SKIP_AUTO_CLEANUP = "true";

import { setupWorker } from "msw/browser";
import { setupServer } from "msw/node";
// import { setupServer } from "msw/node";
import { handlers } from "./src/mock/handlers";

// MSW 서버 설정
const server = setupServer(...handlers);

beforeAll(() => server.listen()); // MSW 서버 시작
afterEach(() => server.resetHandlers()); // 핸들러 리셋
afterAll(() => server.close()); // MSW 서버 종료

// // MSW 서버 설정
// const worker = setupWorker(...handlers);

beforeAll(() =>
  worker.start({
    onUnhandledRequest: "bypass", // 매칭되지 않는 요청 무시
  }),
);
afterEach(() => worker.resetHandlers()); // 핸들러 리셋
afterAll(() => worker.stop()); // MSW 서버 종료

// 환경 변수 설정 (자동 cleanup 비활성화)

// 각 테스트 전 DOM을 초기화
beforeEach(() => {
  cleanup();
});

afterEach(() => {
  // 각 테스트 후 별도 작업은 필요하지 않음
  return;
});

vi.mock("zustand");

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
