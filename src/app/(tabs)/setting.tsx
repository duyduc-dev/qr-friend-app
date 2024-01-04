import { Button } from '@rneui/themed';
import { router } from 'expo-router';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';

const SettingScreen = () => {
  return (
    <LayoutView statusBarTranslucent>
      <QRFTextView>SettingScreen</QRFTextView>
      <Button title="logout" onPress={() => router.push('/(auth)/welcome')} />
    </LayoutView>
  );
};

export default SettingScreen;
