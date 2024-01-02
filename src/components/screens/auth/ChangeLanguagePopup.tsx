import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import QRFPopup from '@/components/common/Popup';
import { QRFPopRef } from '@/components/common/Popup/QRFPopup';
import QRFTextView from '@/components/common/Text';
import { changeLanguage, getCurrentLanguage, LanguageCode } from '@/i18n';
import tw from '@/libs/tailwind';

const ChangeLanguagePopup = () => {
  const { t } = useTranslation();
  const popupRef = useRef<QRFPopRef>(null);
  const [currentLang, setCurrentLang] = useState<LanguageCode>();

  useEffect(() => {
    getCurrentLanguage().then((lang) => lang && setCurrentLang(lang));
  }, []);

  const RenderPopup = ({ data: { lng } }: any) => {
    const changeLng = async (l: LanguageCode) => {
      await changeLanguage(l);
      setCurrentLang(l);
      popupRef.current?.close();
    };

    return (
      <View style={tw`bg-white rounded-12 px-12 py-12 w-150`}>
        <TouchableOpacity
          onPress={() => changeLng(LanguageCode.VN)}
          style={tw.style(
            `py-8 px-12 rounded-8`,
            lng === LanguageCode.VN && 'bg-[rgba(0,0,0,0.05)] ',
          )}
        >
          <QRFTextView fontWeight="600">{t`vietnamese`}</QRFTextView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeLng(LanguageCode.EN)}
          style={tw.style(
            `py-8 px-12 rounded-8`,
            lng === LanguageCode.EN && 'bg-[rgba(0,0,0,0.05)] ',
          )}
        >
          <QRFTextView fontWeight="600">{t`english`}</QRFTextView>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <QRFPopup
      ref={popupRef}
      ignoreStatusBarHeight
      overlayColor="transparent"
      placement="bottom-end"
      offset={{ top: 4 }}
      dataPopup={{ lng: currentLang }}
      render={RenderPopup}
    >
      {({ active }) => (
        <View style={tw`flex-row items-center gap-4`}>
          <QRFTextView fontWeight="500">{t`language`}</QRFTextView>
          <Feather
            name={`chevron-${active ? 'up' : 'down'}`}
            size={20}
            color="black"
          />
        </View>
      )}
    </QRFPopup>
  );
};

export default ChangeLanguagePopup;
