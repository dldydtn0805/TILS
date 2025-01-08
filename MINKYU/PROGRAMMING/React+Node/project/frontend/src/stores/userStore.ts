import { create } from 'zustand';
type userType = {
  email: string;
  name: string;
  role: number; // 0, 1, 2 중 하나;
  _id: string;
};

interface Store {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  user: userType;
  setUser: (value: any) => void;
}
const userStore = create<Store>((set, get) => ({
  isLogin: false,
  setIsLogin: (value: boolean) => set({ isLogin: value }),
  user: { email: '', name: '', role: 0, _id: '' },
  setUser: (value: userType) => set({ user: value }),
}));

export default userStore;
