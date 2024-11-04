// setupTest.js
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import { handlers } from "../../mock/handlers";

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
