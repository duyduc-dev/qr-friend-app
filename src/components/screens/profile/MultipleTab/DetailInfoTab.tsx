import * as Linking from 'expo-linking';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { FacebookLogo, InstagramLogo } from '@/components/common/icon/logo';
import QRFTextView from '@/components/common/Text/QRFTextView';
import tw from '@/libs/tailwind';

type SocialType = {
  url: string;
  logo: ReactNode;
  label: string;
};

const DetailInfoTab = () => {
  const { t } = useTranslation();

  const socials: SocialType[] = [
    {
      url: 'https://www.facebook.com/dangduyduc1908',
      logo: <FacebookLogo />,
      label: t`facebook`,
    },
    {
      url: 'https://www.instagram.com/_duckd/',
      logo: <InstagramLogo />,
      label: t`instagram`,
    },
  ];

  return (
    <View style={tw`gap-12`}>
      {socials.map((item, index) => (
        <TouchableOpacity
          key={`${index}-${item.label}`}
          onPress={() => Linking.openURL(item.url)}
          style={[
            tw`flex-row items-center gap-12 px-16 py-8 rounded-12 border-1 border-grey-25`,
          ]}
        >
          {item.logo}
          <View style={tw`gap-4 flex-1`}>
            <QRFTextView
              numberOfLines={1}
              fontSize={16}
              fontWeight="600"
              style={tw``}
            >
              {item.label}
            </QRFTextView>
            <QRFTextView numberOfLines={1}>{item.url}</QRFTextView>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default DetailInfoTab;
