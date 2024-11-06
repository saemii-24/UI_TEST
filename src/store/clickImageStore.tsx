import { create } from "zustand";

const useClickImageStore = create((set) => ({
  clickImage: false, // 초기값
  setClickImage: (value: boolean) => set({ clickImage: value }),
}));

export default useClickImageStore;
