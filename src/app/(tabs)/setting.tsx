import { Button, Input } from '@rneui/themed';
import { router } from 'expo-router';
import { Text, UserEdit } from 'iconsax-react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AuthApi from '@/apis/AuthApi';
import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import useAuthStore from '@/store/useAuthStore';

const SettingScreen = () => {
  const { t } = useTranslation();
  const offset = useSafeAreaInsets();

  return (
    <LayoutView hiddenHeader statusBarTranslucent>
      <View style={tw`mt-${Math.floor(offset.top) + 24} gap-12`}>
        <TouchableOpacity
          onPress={() => router.push('/profile/edit')}
          style={tw`border-1 border-grey-25 px-16 h-64 rounded-12 bg-white flex-row items-center gap-12`}
        >
          <UserEdit size="24" color={colors.primary} />
          <QRFTextView fontWeight="600" fontSize={16}>
            {t`editProfile`}
          </QRFTextView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/settings/language')}
          style={tw`border-1 border-grey-25 px-16 h-64 rounded-12 bg-white flex-row items-center gap-12`}
        >
          <Text size="24" color={colors.primary} />
          <QRFTextView fontWeight="600" fontSize={16}>
            {t`language`}
          </QRFTextView>
        </TouchableOpacity>
      </View>
      <Button
        containerStyle={tw`mt-auto mb-150`}
        title="logout"
        onPress={() => AuthApi.logout()}
      />
    </LayoutView>
  );
};

export default SettingScreen;
