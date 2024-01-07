import { router } from 'expo-router';
import { Camera } from 'iconsax-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import LayoutView from '@/components/common/LayoutView';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import useAuthStore from '@/store/useAuthStore';
const QrConnectScreen = () => {
  const { currentUser } = useAuthStore();
  return (
    <LayoutView statusBarTranslucent>
      <View style={tw`flex-2 items-center justify-center`}>
        <View style={tw`border-2 border-primary p-16 rounded-12 mt-24`}>
          <QRCode size={200} value={currentUser?.uid} />
        </View>
        <TouchableOpacity
          style={tw`bg-grey-100 p-16 rounded-12 mt-24`}
          onPress={() => router.push('/scan-qr')}
        >
          <Camera size="32" color={colors.grey['600']} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1`} />
    </LayoutView>
  );
};

export default QrConnectScreen;
