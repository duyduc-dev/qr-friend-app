import { Button } from '@rneui/themed';
import { router } from 'expo-router';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';

const TabSearchScreen = () => {
  return (
    <LayoutView statusBarTranslucent>
      <QRFTextView>TabSearchScreen</QRFTextView>
      <Button title="login" onPress={() => router.push('/(auth)/welcome')} />
    </LayoutView>
  );
};

export default TabSearchScreen;
