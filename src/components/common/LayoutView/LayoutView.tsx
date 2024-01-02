import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import {
  Image,
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormWrapper from 'src/components/common/FormWrapper';

import tw from '@/libs/tailwind';

type Props = {
  children: ReactNode;
  statusBarBgColor?: string;
  statusBarTranslucent?: boolean;
  hiddenHeader?: boolean;
  hiddenBackIcon?: boolean;
  isForm?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
};

const LayoutView = (props: Props) => {
  const {
    children,
    containerStyle,
    contentStyle,
    headerStyle,
    statusBarBgColor,
    isForm,
    hiddenBackIcon,
    hiddenHeader,
    statusBarTranslucent = false,
  } = props;

  const offset = useSafeAreaInsets();

  const Content = () => (
    <View style={[tw`px-16 flex-1`, contentStyle]}>{children}</View>
  );

  const WrapperContent = () =>
    isForm ? (
      <FormWrapper>
        <Content />
      </FormWrapper>
    ) : (
      <Content />
    );

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, containerStyle]}>
      <StatusBar
        animated
        translucent={statusBarTranslucent}
        backgroundColor={statusBarBgColor}
      />
      <View style={tw`absolute top-0 bottom-0 right-0 left-0`}>
        <Image style={tw`ml-auto`} source={require('@/assets/ellipse.png')} />
      </View>
      {!hiddenHeader && (
        <View style={[tw`mt-${Math.floor(offset.top)} px-16`, headerStyle]}>
          <TouchableOpacity
            style={tw.style(
              `mt-24 w-32 h-32 items-center justify-center`,
              hiddenBackIcon && 'hidden',
            )}
            onPress={() => router.canGoBack() && router.back()}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
        </View>
      )}
      <WrapperContent />
    </SafeAreaView>
  );
};

export default LayoutView;
