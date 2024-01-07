import { Button } from '@rneui/themed';
import React, { useRef } from 'react';

import LoadingAnimation, {
  LoadingAnimationRef,
} from '@/components/common/animation/LoadingAnimation';
import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';

const TabSearchScreen = () => {
  const loadingRef = useRef<LoadingAnimationRef>(null);

  return (
    <LayoutView statusBarTranslucent>
      <QRFTextView>TabSearchScreen</QRFTextView>
      <Button title="loading" onPress={() => loadingRef.current?.open()} />
      <LoadingAnimation ref={loadingRef} />
    </LayoutView>
  );
};

export default TabSearchScreen;
