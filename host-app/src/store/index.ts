import { create } from 'zustand';

// Định nghĩa type cho state
interface AppState {
  count: number;
  user: string;
  increment: () => void;
  setUser: (user: string) => void;
  setStore: (payload: AppState) => void;
}

// Tạo store
const useHostAppStore = create<AppState>((set) => ({
  count: 0,
  user: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  setUser: (user) => set({ user }),
  setStore: (payload) => set((state) => (Object.assign(state, payload))),
}));

export default useHostAppStore;