import { SearchNormal1, Setting, User } from 'iconsax-react-native';
import React from 'react';

import { colors } from '@/constants';

type Props = {
  route: string;
  focused: boolean;
};

const BottomTabIcon = (props: Props) => {
  const Icon = ({ focused, route }: Props) => {
    const SIZE = 24;
    switch (route) {
      case 'index':
        return <User size={SIZE} color={focused ? colors.primary : '#fff'} />;
      case 'search':
        return (
          <SearchNormal1
            size={SIZE}
            color={focused ? colors.primary : '#fff'}
          />
        );
      case 'setting':
        return (
          <Setting size={SIZE} color={focused ? colors.primary : '#fff'} />
        );
      default:
        return null;
    }
  };

  return <Icon {...props} />;
};

export default BottomTabIcon;
