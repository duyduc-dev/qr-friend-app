import { BarCodeScanner } from 'expo-barcode-scanner';
import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';
import tw from '@/libs/tailwind';

const ScanQrScreen = () => {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useFocusEffect(() => {
    if (scanned) {
      setScanned(false);
      router.back();
    }
  });

  return (
    <LayoutView statusBarTranslucent>
      <View style={tw`flex-2 items-center justify-center`}>
        <QRFTextView
          fontSize={18}
          fontWeight="700"
          align="center"
          style={tw`mb-24`}
        >
          {t`findYouFriendByQrCode`}
        </QRFTextView>
        <View style={tw`border-2 border-primary rounded-12 p-16`}>
          <View style={tw`w-300 h-300 rounded-12 overflow-hidden bg-primary`}>
            <BarCodeScanner
              style={tw`h-300 w-300 rounded-12`}
              onBarCodeScanned={
                scanned
                  ? undefined
                  : (params) => {
                      setScanned(true);
                      router.push(`/profile/${params.data}`);
                    }
              }
            />
            <View
              style={tw`absolute top-0 left-0 right-0 bottom-0 border-3 border-t-30 border-b-30 border-primary`}
            />
          </View>
        </View>
      </View>
      <View style={tw`flex-1`} />
    </LayoutView>
  );
};

export default ScanQrScreen;
