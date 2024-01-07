import { ThemeProvider } from '@rneui/themed';
import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from '@/components/core/AuthProvider';
import i18n, { initialLanguage } from '@/i18n';
import { theme } from '@/libs/rneui';
import tw from '@/libs/tailwind';

const QRFRootContainer = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initialLanguage();
  }, []);

  return (
    <SafeAreaProvider style={tw`flex-1`}>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default QRFRootContainer;
