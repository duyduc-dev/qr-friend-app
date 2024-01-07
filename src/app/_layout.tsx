import 'intl-pluralrules';
import 'react-native-gesture-handler';

import { SplashScreen, Stack } from 'expo-router';
import * as Updates from 'expo-updates';
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
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

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
