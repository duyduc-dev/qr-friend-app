import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormWrapper from 'src/components/common/FormWrapper';

import QRFTextView from '@/components/common/Text';
import tw from '@/libs/tailwind';

type Props = {
  children: ReactNode;
  statusBarBgColor?: string;
  title?: string;
  statusBarTranslucent?: boolean;
  hiddenHeader?: boolean;
  hiddenBackIcon?: boolean;
  isForm?: boolean;
  middleComponent?: ReactNode;
  statusBarStyle?: StatusBarStyle;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  containerTitleStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

const LayoutView = (props: Props) => {
  const {
    title,
    children,
    containerStyle,
    contentStyle,
    headerStyle,
    statusBarBgColor,
    isForm,
    hiddenBackIcon,
    hiddenHeader,
    statusBarTranslucent = false,
    statusBarStyle,
    middleComponent,
    containerTitleStyle,
    titleStyle,
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
        style={statusBarStyle}
        translucent={statusBarTranslucent}
        backgroundColor={statusBarBgColor}
      />
      <View style={tw`absolute top-0 bottom-0 right-0 left-0`}>
        <Image style={tw`ml-auto`} source={require('@/assets/ellipse.png')} />
      </View>
      {!hiddenHeader && (
        <View
          style={[
            tw.style(
              `flex-row items-center px-16 mt-24`,
              Platform.OS === 'android' && `mt-${Math.floor(offset.top)}`,
            ),
            headerStyle,
          ]}
        >
          <TouchableOpacity
            style={tw.style(
              `w-32 h-32 items-center justify-center`,
              hiddenBackIcon && 'hidden',
            )}
            onPress={() => router.canGoBack() && router.back()}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
          {middleComponent ?? (
            <>
              <View style={[tw`flex-1`, containerTitleStyle]}>
                <QRFTextView
                  align="center"
                  fontSize={18}
                  fontWeight="600"
                  style={titleStyle}
                >
                  {title}
                </QRFTextView>
              </View>
              <View style={tw`w-32`} />
            </>
          )}
        </View>
      )}
      <WrapperContent />
    </SafeAreaView>
  );
};

export default LayoutView;
