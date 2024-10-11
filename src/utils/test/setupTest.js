// setupTest.js
import "@testing-library/jest-dom";
import { vi } from "vitest";

// 비동기 작업 후 모든 mock 상태를 초기화
afterEach(() => {
  vi.clearAllMocks();
});

// 모든 테스트 후 mock 상태를 리셋
afterAll(() => {
  vi.resetAllMocks();
});

// matchMedia를 mock으로 정의하여 CSS media queries 테스트를 지원
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
