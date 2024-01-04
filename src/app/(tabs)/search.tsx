import { Button } from '@rneui/themed';
import { router } from 'expo-router';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';

const TabSearchScreen = () => {
  return (
    <LayoutView statusBarTranslucent>
      <QRFTextView>TabSearchScreen</QRFTextView>
    </LayoutView>
  );
};

export default TabSearchScreen;
