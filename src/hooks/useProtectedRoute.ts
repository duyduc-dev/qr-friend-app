import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';

import useAuthStore from '@/store/useAuthStore';

const useProtectedRoute = () => {
  const { isLogin, currentUser } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();

  // checking that navigation is all good;
  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useLayoutEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLogin && !currentUser && !inAuthGroup) {
      router.push('/welcome');
    } else if (isLogin && currentUser && inAuthGroup) {
      router.replace('/');
    }
  }, [currentUser, isLogin, isNavigationReady, segments]);
};

export default useProtectedRoute;
