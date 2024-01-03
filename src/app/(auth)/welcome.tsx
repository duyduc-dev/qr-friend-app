import { Button } from '@rneui/themed';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';
import ChangeLanguagePopup from '@/components/screens/auth/ChangeLanguagePopup';
import tw from '@/libs/tailwind';

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const offset = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  return (
    <LayoutView
      hiddenHeader
      statusBarTranslucent
      contentStyle={tw`px-0 bg-white`}
    >
      <View style={tw`flex-1`}>
        <View style={tw`absolute top-0 right-0 bottom-0 left-0`}>
          <View>
            <Image
              style={tw`mt-10 absolute mx-auto`}
              source={require('@/assets/wfh.png')}
            />
          </View>
        </View>
        <View style={tw`flex-1`}>
          <View
            style={tw.style(
              `ml-auto mr-42 `,
              Platform.OS === 'android' && `mt-${Math.floor(offset.top) + 12}`,
            )}
          >
            <ChangeLanguagePopup />
          </View>
        </View>
        <View style={tw`flex-1 px-16 justify-center `}>
          <View style={tw`rounded-12 overflow-hidden`}>
            <BlurView intensity={100} style={tw`rounded-12 px-16 py-16`}>
              <QRFTextView
                fontWeight="800"
                style={tw`text-primary text-center text-25`}
              >
                {t`connectWithYourFriends`}
              </QRFTextView>
              <QRFTextView align="center" style={tw`mt-24`}>
                {t`discoverNewTimeToSpendWithYourLovedOnes`}
              </QRFTextView>
              <View
                style={tw`flex-row items-center justify-between mt-32 gap-16`}
              >
                <Button
                  onPress={() => router.push('/(auth)/login')}
                  title={t`login`}
                  type="solid"
                  containerStyle={tw`flex-1`}
                />
                <Button
                  onPress={() => router.push('/(auth)/register')}
                  title={t`register`}
                  type="clear"
                  buttonStyle={tw`bg-white`}
                  containerStyle={tw`flex-1`}
                />
              </View>
            </BlurView>
          </View>
        </View>
      </View>
    </LayoutView>
  );
};

export default WelcomeScreen;
