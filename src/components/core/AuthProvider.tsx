import auth from '@react-native-firebase/auth';
import { router, useNavigation, useRouter, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';

import UserApi from '@/apis/UserApi';
import { StorageKeys } from '@/constants';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import { Auth } from '@/modals/common/auth';
import useAuthStore from '@/store/useAuthStore';
import StorageHelper from '@/utils/StorageHelper';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setAuth } = useAuthStore();
  const route = useSegments();

  useProtectedRoute();

  const requestSession = async () => {
    const token = await StorageHelper.getStore(StorageKeys.ACCESS_TOKEN);
    const auth = await UserApi.getAuth();
    if (token && auth) {
      setAuth(auth);
    }
  };

  useEffect(() => {
    requestSession();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
