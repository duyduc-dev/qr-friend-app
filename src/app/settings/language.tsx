import { Button } from '@rneui/themed';
import { TickCircle } from 'iconsax-react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import LoadingAnimation, {
  LoadingAnimationRef,
} from '@/components/common/animation/LoadingAnimation';
import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import { changeLanguage, getCurrentLanguage, LanguageCode } from '@/i18n';
import tw from '@/libs/tailwind';

const LanguageScreen = () => {
  const { t } = useTranslation();
  const loadingRef = useRef<LoadingAnimationRef>(null);
  const [currentLng, setCurrentLng] = useState<LanguageCode>();

  useEffect(() => {
    getCurrentLanguage().then((lng) => setCurrentLng(lng));
  }, []);

  return (
    <LayoutView title={t`language`} statusBarTranslucent>
      <View style={tw`flex-1 mt-40`}>
        <View style={tw` gap-12`}>
          <TouchableOpacity
            onPress={() => setCurrentLng(LanguageCode.VN)}
            style={tw.style(
              'border-2 border-grey-25 px-16 h-64 items-center rounded-12 bg-white flex-row justify-between',
              currentLng === LanguageCode.VN && 'border-primary',
            )}
          >
            <QRFTextView
              fontSize={16}
              fontWeight="600"
            >{t`vietnamese`}</QRFTextView>
            {currentLng === LanguageCode.VN && (
              <TickCircle size="24" color={colors.primary} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentLng(LanguageCode.EN)}
            style={tw.style(
              'border-2 border-grey-25 px-16 h-64 items-center rounded-12 bg-white flex-row justify-between',
              currentLng === LanguageCode.EN && 'border-primary',
            )}
          >
            <QRFTextView
              fontSize={16}
              fontWeight="600"
            >{t`english`}</QRFTextView>
            {currentLng === LanguageCode.EN && (
              <TickCircle size="24" color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
        <Button
          containerStyle={tw`mt-auto pb-16 `}
          buttonStyle={tw`h-50`}
          title={t`change`}
          onPress={() => {
            requestAnimationFrame(
              () =>
                loadingRef.current?.open({
                  duration: 2000,
                  onEnd: () => currentLng && changeLanguage(currentLng),
                }),
            );
          }}
        />
        <LoadingAnimation ref={loadingRef} />
      </View>
    </LayoutView>
  );
};

export default LanguageScreen;
