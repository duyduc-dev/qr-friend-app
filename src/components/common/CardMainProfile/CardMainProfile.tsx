import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';

import WrapInfo from '@/components/common/CardMainProfile/WrapInfo';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import { boxShadowStyle } from '@/syles/StyleGlobal';
type Props = {
  title: string;
  username: string;
  bio?: string;
};
const CardMainProfile = ({ username, title, bio }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={[tw`m-2 p-18 bg-white rounded-35 mt-24`, boxShadowStyle.one]}>
      <View style={tw`flex-row gap-24`}>
        <View
          style={[
            tw`p-6 self-start bg-white rounded-full items-center justify-center`,
            boxShadowStyle.one,
          ]}
        >
          <Image
            resizeMode="cover"
            style={tw`w-90 h-140 rounded-full`}
            source={require('@/assets/character1.png')}
          />
        </View>
        <View style={tw`py-6 flex-1`}>
          <View style={tw`flex-row justify-between gap-6`}>
            <View style={tw`flex-1 gap-4`}>
              <QRFTextView fontSize={18} numberOfLines={2} fontWeight="700">
                {title}
              </QRFTextView>
              <QRFTextView
                fontSize={14}
                color={colors.grey['200']}
                numberOfLines={1}
                fontWeight="500"
              >
                @{username}
              </QRFTextView>
            </View>
            <TouchableOpacity onPress={() => router.push('/qr-connect')}>
              <AntDesign name="qrcode" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center gap-8 flex-wrap mt-8`}>
            <WrapInfo quantity={0} label={t`posts`} />
            <WrapInfo quantity={0} label={t`followers`} />
            <WrapInfo quantity={0} label={t`following`} />
          </View>
        </View>
      </View>
      {bio && (
        <View style={tw`p-10`}>
          <QRFTextView fontSize={14} fontWeight="800" numberOfLines={3}>
            {t`bio`}:{' '}
            <QRFTextView fontSize={14} fontWeight="500">
              {bio}
            </QRFTextView>
          </QRFTextView>
        </View>
      )}
    </View>
  );
};

export default CardMainProfile;
