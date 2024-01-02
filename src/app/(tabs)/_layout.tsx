import { router, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AnimatedTabBar from '@/components/common/AnimatedTabBar';
import useAuthStore from '@/store/useAuthStore';

const TabLayout = () => {
  const { t } = useTranslation();
  const { isLogin } = useAuthStore();

  useEffect(() => {
    requestIdleCallback(() => {
      if (!isLogin) {
        router.replace('/(auth)/welcome');
      }
    });
  }, [isLogin]);

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
    </Tabs>
  );
};

export default TabLayout;
