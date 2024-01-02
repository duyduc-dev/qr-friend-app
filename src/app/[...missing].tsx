import { Button } from '@rneui/themed';
import { router } from 'expo-router';

import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';

const NotFoundScreen = () => {
  return (
    <LayoutView statusBarTranslucent>
      <QRFTextView>Not Found</QRFTextView>
      <Button
        title="Back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.push('/(tabs)/')
        }
      />
    </LayoutView>
  );
};

export default NotFoundScreen;
