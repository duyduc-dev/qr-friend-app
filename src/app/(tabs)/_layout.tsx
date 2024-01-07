import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import AnimatedTabBar from '@/components/common/AnimatedTabBar';

const TabLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="setting" />
    </Tabs>
  );
};

export default TabLayout;
