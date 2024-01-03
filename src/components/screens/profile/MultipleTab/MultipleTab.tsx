import React, { useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { QRFTabsRef } from '@/components/common/Tabs';
import QRFTextView from '@/components/common/Text';
import tw from '@/libs/tailwind';

import ProfileTab from './ProfileTab';

const MultipleTab = () => {
  const tabRef = useRef<QRFTabsRef>(null);
  const pageViewRef = useRef<PagerView>(null);
  return (
    <View style={tw`flex-1`}>
      <ProfileTab
        ref={tabRef}
        onChange={(index) => pageViewRef.current?.setPage(index)}
      />
      <PagerView
        onPageSelected={(e) =>
          tabRef.current?.changeTab(e.nativeEvent.position)
        }
        ref={pageViewRef}
        style={tw`flex-1 mt-16`}
        initialPage={0}
      >
        <View key={1}>
          <QRFTextView>1</QRFTextView>
        </View>
        <View key={2}>
          <QRFTextView>2</QRFTextView>
        </View>
      </PagerView>
    </View>
  );
};

export default MultipleTab;
