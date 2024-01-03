import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import tw from '@/libs/tailwind';

type Props = {
  initialTab?: number;
  onChange?: (index: number) => void;
  data: any[];
  renderItem: (p: { item: any; index: number; focused: boolean }) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
};

export type QRFTabsRef = {
  changeTab: (index: number) => void;
};

const QRFTabs = forwardRef<QRFTabsRef, Props>((props: Props, ref) => {
  const {
    data,
    containerStyle,
    contentStyle,
    itemStyle,
    initialTab = -1,
    onChange,
    renderItem,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(initialTab);

  const handleChange = (index: number) => {
    onChange?.(index);
  };

  useImperativeHandle(ref, () => ({
    changeTab: (i) => setCurrentIndex(i),
  }));

  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[tw`gap-8`, contentStyle]}
      >
        {data.map((item, index) => {
          const focused = index === currentIndex;
          return (
            <Pressable
              onPress={() => handleChange(index)}
              style={itemStyle}
              key={`${index}`}
            >
              {renderItem({ item, index, focused })}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
});
export default QRFTabs;
