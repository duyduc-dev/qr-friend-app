import { create } from 'zustand';

type AuthState = {
  isLogin: boolean;
};

type AuthActions = {
  setAuth: (p: Partial<AuthState>) => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isLogin: false,

  setAuth: (p) => set(p),
}));

export default useAuthStore;
