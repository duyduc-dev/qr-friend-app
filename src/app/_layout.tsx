import 'intl-pluralrules';
import 'react-native-gesture-handler';

import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useDeviceContext } from 'twrnc';

import QRFRootContainer from '@/components/core/QRFRootContainer';
import useLoadFont from '@/hooks/useLoadFont';
import tw from '@/libs/tailwind';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { fontsLoaded, error } = useLoadFont();
  useDeviceContext(tw);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QRFRootContainer>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      />
    </QRFRootContainer>
  );
};

export default RootLayout;
