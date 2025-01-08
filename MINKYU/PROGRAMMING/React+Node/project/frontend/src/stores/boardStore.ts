import { create } from 'zustand';

type boardType = {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Store {
  boards: boardType[];
  setBoards: (value: boardType[]) => void;
}
const boardStore = create<Store>((set, get) => ({
  boards: [],
  setBoards: (value: boardType[]) => set({ boards: value }),
}));

export default boardStore;
