import * as zustand from "zustand";
import { act } from "@testing-library/react";
import { vi } from "vitest";

const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>("zustand");

// 상태를 리셋하는 함수를 저장할 Set을 생성
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState(); // 초기 상태를 가져옴
  storeResetFns.add(() => {
    store.setState(initialState, true); // 초기 상태로 리셋
  });
  return store;
};

// Zustand의 create 함수 모킹
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand create mock");

  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried(stateCreator);
}) as typeof zustand.create;

const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState(); // 초기 상태를 가져옴
  storeResetFns.add(() => {
    store.setState(initialState, true); // 초기 상태로 리셋
  });
  return store;
};

// Zustand의 createStore 함수 모킹
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand createStore mock");

  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried(stateCreator);
}) as typeof zustand.createStore;

// 각 테스트 후 모든 스토어를 리셋
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
