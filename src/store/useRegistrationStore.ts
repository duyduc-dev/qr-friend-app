import { create } from 'zustand';

import { UserModal } from '@/modals/common/user';
import { RegisterRequest } from '@/modals/request/AuthRequest';

type RegistrationState = {
  authRegister: RegisterRequest | null;
};

type RegistrationActions = {
  setAuthRegister: (user: RegisterRequest | null) => void;
};

const userRegistrationStore = create<RegistrationState & RegistrationActions>(
  (set) => ({
    userRegister: null,
    authRegister: null,

    setAuthRegister: (auth) => set({ authRegister: auth }),
  }),
);

export default userRegistrationStore;
