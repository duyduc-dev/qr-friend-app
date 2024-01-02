import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { StorageKeys } from '@/constants';
import StorageHelper from '@/utils/StorageHelper';

export enum LanguageCode {
  EN = 'en',
  VN = 'vn',
}

const resources = {
  [LanguageCode.EN]: {
    translation: require('./locale/en.json'),
  },
  [LanguageCode.VN]: {
    translation: require('./locale/vn.json'),
  },
};

async function changeLanguage(languageKey: LanguageCode) {
  __DEV__ && console.log('===> languageKey : ' + languageKey);
  await StorageHelper.setStore(StorageKeys.APP_LANGUAGE, languageKey);
  await i18next.changeLanguage(languageKey); // -> returns a Promise
}

const getCurrentLanguage = async () => {
  let lang = await StorageHelper.getStore(StorageKeys.APP_LANGUAGE);
  if (lang === null) {
    lang = await initialLanguage();
  }
  __DEV__ && console.log('===> Current Language: ' + lang);
  return lang as LanguageCode;
};

const initialLanguage = async () => {
  let lang = await StorageHelper.getStore(StorageKeys.APP_LANGUAGE);
  if (lang === null) {
    lang = LanguageCode.EN;
  }
  __DEV__ && console.log('===> loading Language: ', lang);
  await changeLanguage(lang as LanguageCode);
  return lang as LanguageCode;
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: LanguageCode.EN,
  lng: LanguageCode.EN,
  resources,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});
const i18n = i18next;
export default i18n;

export { changeLanguage, getCurrentLanguage, initialLanguage };
