import React, { useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { QRFTabsRef } from '@/components/common/Tabs';
import QRFTextView from '@/components/common/Text';
import DetailInfoTab from '@/components/screens/profile/MultipleTab/DetailInfoTab';
import PostsTab from '@/components/screens/profile/MultipleTab/PostsTab';
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
        <PostsTab key={0} />
        <DetailInfoTab key={1} />
      </PagerView>
    </View>
  );
};

export default MultipleTab;
