import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import LayoutView from '@/components/common/LayoutView';
const QrConnectScreen = () => {
  return (
    <LayoutView statusBarTranslucent>
      <QRCode
        value={JSON.stringify({
          name: 'Duy Duc',
        })}
      />
    </LayoutView>
  );
};

export default QrConnectScreen;
