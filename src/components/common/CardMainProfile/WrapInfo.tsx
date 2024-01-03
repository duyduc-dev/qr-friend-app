import React from 'react';
import { View } from 'react-native';

import QRFTextView from '@/components/common/Text';
import tw from '@/libs/tailwind';

const WrapInfo = ({ label, quantity }: { quantity: number; label: string }) => {
  return (
    <View style={tw`self-start bg-secondary p-10 rounded-20`}>
      <QRFTextView align="center" fontSize={16} fontWeight="600">
        {quantity > 99 ? '99+' : quantity}
      </QRFTextView>
      <QRFTextView align="center" fontSize={14} fontWeight="600">
        {label}
      </QRFTextView>
    </View>
  );
};

export default WrapInfo;
