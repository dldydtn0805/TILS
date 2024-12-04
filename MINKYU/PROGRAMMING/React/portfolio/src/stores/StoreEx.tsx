import { create } from 'zustand';

interface Store {
  selectedButton: string | null;
  setSelectedButton: (value: string) => void;
  count: number;
  setCount: (value: number) => void;
}

const useStore = create<Store>((set: any) => ({
  selectedButton: null,
  setSelectedButton: (value) => set({ selectedButton: value }),
  count: 0,
  setCount: (value) => set({ count: value }),
}));

export default useStore;
