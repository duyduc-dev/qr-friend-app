import { Heart, UserTag } from 'iconsax-react-native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import QRFTabs, { QRFTabsRef } from '@/components/common/Tabs';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';

const ProfileTab = forwardRef<
  QRFTabsRef,
  { onChange?: (index: number) => void }
>(({ onChange }, ref) => {
  const { t } = useTranslation();
  const tabsRef = useRef<QRFTabsRef>(null);

  useImperativeHandle(ref, () => ({
    changeTab: (i) => tabsRef.current?.changeTab(i),
  }));

  return (
    <QRFTabs
      ref={tabsRef}
      initialTab={0}
      contentStyle={tw`px-8 gap-12`}
      containerStyle={tw`mt-24`}
      onChange={onChange}
      data={[
        {
          Icon: Heart,
          label: t`posts`,
        },
        {
          Icon: UserTag,
          label: t`detail`,
        },
      ]}
      renderItem={({ item, focused }) => (
        <View
          style={tw.style(
            'border-b-2 border-b-transparent px-8 pb-8 flex-row gap-8 items-center',
            focused && 'border-b-primary',
          )}
        >
          <item.Icon
            size={28}
            color={focused ? colors.primary : colors.black}
          />
          <QRFTextView
            fontSize={15}
            fontWeight="600"
            color={focused ? colors.primary : colors.black}
          >
            {item.label}
          </QRFTextView>
        </View>
      )}
    />
  );
});

export default ProfileTab;
