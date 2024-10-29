// setupTest.js
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { handlers } from "../../mock/handlers";

const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
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
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
