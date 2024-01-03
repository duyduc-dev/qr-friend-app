import React from 'react';
import { useTranslation } from 'react-i18next';

import CardMainProfile from '@/components/common/CardMainProfile';
import LayoutView from '@/components/common/LayoutView';
import MultipleTab from '@/components/screens/profile/MultipleTab';

const TabOneScreen = () => {
  const { t } = useTranslation();
  return (
    <LayoutView hiddenBackIcon statusBarTranslucent>
      <CardMainProfile />
      <MultipleTab />
    </LayoutView>
  );
};

export default TabOneScreen;
