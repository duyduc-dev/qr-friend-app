import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';

const ProgressStepBar = ({
  step,
  totalStep,
  showNumberStep,
  progressBarColor,
  incompleteBarColor,
  containerStyle,
  numberStepStyle,
}: {
  step: number;
  totalStep: number;
  showNumberStep?: boolean;
  progressBarColor?: string;
  incompleteBarColor?: string;
  numberStepStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const widthStep = (step / totalStep) * 100;

  const progressPercent = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  const load = () => {
    Animated.timing(animation, {
      toValue: widthStep,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    load();
  }, [step]);

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <View
        style={[
          tw`h-15 flex-row w-[100%] rounded-20 mt-20`,
          {
            backgroundColor: incompleteBarColor ?? colors.grey['500'],
          },
        ]}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: progressBarColor ?? colors.primary,
              width: progressPercent,
              borderRadius: 20,
            },
          ]}
        />
      </View>
      {showNumberStep && (
        <QRFTextView style={[tw``, numberStepStyle]}>
          {step}/{totalStep}
        </QRFTextView>
      )}
    </View>
  );
};

export default ProgressStepBar;
