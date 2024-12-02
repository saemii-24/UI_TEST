import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 타입 정의
interface ToastState {
  isToastVisible: boolean; // Toast 표시 여부
  showToast: () => void; // Toast 표시
  hideToast: () => void; // Toast 숨기기
}

const useToastStore = create<ToastState>()(
  persist(
    (set) => ({
      isToastVisible: false, // Toast 기본 상태는 숨김
      showToast: () => set({ isToastVisible: true }), // Toast 표시
      hideToast: () => set({ isToastVisible: false }), // Toast 숨기기
    }),
    {
      name: "toast-storage", // localStorage 키 이름
    },
  ),
);

export default useToastStore;
