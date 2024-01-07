import React from 'react';
import { useTranslation } from 'react-i18next';

import CardMainProfile from '@/components/common/CardMainProfile';
import LayoutView from '@/components/common/LayoutView';
import MultipleTab from '@/components/screens/profile/MultipleTab';
import useAuthStore from '@/store/useAuthStore';
import Tools from '@/utils/Tools';

const TabOneScreen = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuthStore();
  return (
    <LayoutView hiddenBackIcon statusBarTranslucent>
      <CardMainProfile
        title={Tools.templateString`${currentUser?.firstName} ${currentUser?.lastName}`}
        username={currentUser?.username}
      />
      <MultipleTab />
    </LayoutView>
  );
};

export default TabOneScreen;
