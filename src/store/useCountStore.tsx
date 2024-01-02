import { create } from 'zustand';

type CountState = {
  count: number;
};

type CountActions = {
  setCount: (num: number) => void;
};

const useCountStore = create<CountState & CountActions>((set) => ({
  count: 0,

  setCount: (num) => set({ count: num }),
}));

export default useCountStore;
