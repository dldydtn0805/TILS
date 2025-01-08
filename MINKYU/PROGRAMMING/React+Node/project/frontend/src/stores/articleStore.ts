import { create } from 'zustand';

type articleType = {
  _id: string;
  board_id: string;
  user_id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Store {
  articles: articleType[];
  setArticles: (value: articleType[]) => void;
}
const articleStore = create<Store>((set, get) => ({
  articles: [],
  setArticles: (value: articleType[]) => set({ articles: value }),
}));

export default articleStore;
