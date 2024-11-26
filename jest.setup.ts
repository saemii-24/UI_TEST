import "@testing-library/jest-dom";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, afterAll, beforeAll } from "@jest/globals"; // Jest 환경에서 @jest/globals에서 임포트

import { setupServer } from "msw/node"; // MSW 서버 설정 (Node.js 환경)
import { handlers } from "./src/mock/handlers"; // mock handlers

// MSW 서버 설정
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen(); // MSW 서버 시작
});

afterEach(() => {
  server.resetHandlers(); // 핸들러 리셋
});

afterAll(() => {
  server.close(); // MSW 서버 종료
});

// 환경 변수 설정 (자동 cleanup 비활성화)
process.env.RTL_SKIP_AUTO_CLEANUP = "true";

// 각 테스트 전 DOM 초기화
beforeEach(() => {
  cleanup();
});

// 비동기 작업 및 mock 상태 초기화
afterEach(() => {
  jest.clearAllMocks(); // `vi.clearAllMocks()` 대신 `jest.clearAllMocks()` 사용
});

afterAll(() => {
  jest.resetAllMocks(); // `vi.resetAllMocks()` 대신 `jest.resetAllMocks()` 사용
});

// matchMedia를 mock으로 정의하여 CSS media queries 테스트 지원
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
