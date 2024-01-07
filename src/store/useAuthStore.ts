import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { create } from 'zustand';

import { StorageKeys } from '@/constants';
import { Auth } from '@/modals/common/auth';
import { UserModal } from '@/modals/common/user';
import StorageHelper from '@/utils/StorageHelper';

type AuthState = {
  isLogin: boolean;
  currentUser: UserModal | null;
};

type AuthActions = {
  setAuth: (p: UserModal) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  isLogin: false,
  currentUser: null,

  setAuth: (auth) => {
    set({
      isLogin: auth !== null,
      currentUser: auth,
    });
  },
  logout: async () => {
    set({
      isLogin: false,
      currentUser: null,
    });
  },
}));

export default useAuthStore;
