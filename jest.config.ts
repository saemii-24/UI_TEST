import type { Config } from "jest";

const config: Config = {
  // 자동으로 모든 모듈을 mock 처리할지 여부 (기본값: false)
  automock: false,

  // 테스트 실패 후 테스트를 중지할 횟수 (기본값: 0)
  bail: 1, // 첫 번째 실패 후 중지

  // Jest가 사용하는 테스트 환경 설정
  testEnvironment: "jsdom", // 브라우저 환경을 흉내 낸 jsdom 사용

  // 테스트 파일을 찾는 glob 패턴 (기본값: **/?(*.)+(spec|test).[tj]s?(x))
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)", // `test` 또는 `spec`이 포함된 파일을 찾음
  ],

  // 모듈을 변환할 때 사용하는 변환기 설정
  transform: {
    "^.+\\.tsx?$": "ts-jest", // TypeScript 파일 변환
    "^.+\\.jsx?$": "babel-jest", // JavaScript 파일 변환
  },

  // TypeScript 또는 경로 alias를 사용할 경우 모듈 경로 매핑 설정
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 예시: @/으로 시작하는 경로를 src 폴더로 매핑
  },

  // 모듈이 저장될 경로 설정
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // 테스트 환경을 설정하는 파일 (예: jest-dom 등)
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect", // jest-dom을 추가하여 DOM 관련 테스트 편리하게
  ],

  // mock 상태를 리셋할지 여부
  resetMocks: true,

  // 커버리지 수집 여부
  collectCoverage: true,

  // 커버리지 결과를 저장할 디렉토리
  coverageDirectory: "<rootDir>/coverage",

  // 테스트 커버리지 수집할 파일
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // src 디렉토리 내의 모든 파일에 대해 커버리지 수집
    "!src/**/*.d.ts", // 타입 정의 파일은 제외
  ],

  // 테스트 결과 보고 방식 설정 (선택 사항)
  reporters: ["default", "jest-junit"], // 기본 + JUnit 형식의 보고서

  // 기본적으로 모든 mock 상태를 초기화하기 위한 설정
  clearMocks: true,

  // 테스트 타임아웃 설정 (기본값: 5000ms)
  testTimeout: 10000, // 테스트가 10초 이상 걸리면 실패로 처리

  // 테스트 경로에서 특정 디렉토리를 제외하는 설정
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // node_modules와 dist 폴더 제외

  // 커버리지 기준 설정 (선택 사항)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
