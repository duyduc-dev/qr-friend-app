import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import BottomTabIcon from '@/components/common/AnimatedTabBar/BottomTabIcon';
import QRFTextView from '@/components/common/Text';
import tw from '@/libs/tailwind';
const AnimatedTabBar = ({
  navigation,
  descriptors,
  state,
}: BottomTabBarProps) => {
  const MARGIN = 20;
  const TAB_BAR_WIDTH = state.routes.length * 44 + state.routes.length * MARGIN;
  const TAB_ITEM_WIDTH = 44;

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          TAB_ITEM_WIDTH * state.index + MARGIN / 2 + state.index * MARGIN,
        ),
      },
    ],
  }));

  return (
    <View
      style={tw.style(
        `flex-row h-64 absolute bg-primary self-center rounded-full items-center justify-center overflow-hidden`,
        { width: TAB_BAR_WIDTH, bottom: MARGIN },
      )}
    >
      <Animated.View
        style={[
          { ...StyleSheet.absoluteFillObject, width: TAB_ITEM_WIDTH },
          tw`items-center justify-center `,
          translateAnimation,
        ]}
      >
        <View style={tw`w-46 h-46 rounded-full bg-white`} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={`${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={tw`flex-1 justify-center items-center gap-4`}>
              <BottomTabIcon focused={isFocused} route={route.name} />
              {/*{isFocused && (*/}
              {/*  <QRFTextView*/}
              {/*    fontSize={12}*/}
              {/*    style={{ color: isFocused ? '#0067ff' : '#fff' }}*/}
              {/*  >*/}
              {/*    {route.name}*/}
              {/*  </QRFTextView>*/}
              {/*)}*/}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AnimatedTabBar;
