import * as yup from 'yup';

import i18n from '@/i18n';

yup.setLocale({
  mixed: {
    required: () => i18n.t('fieldRequired'),
  },
  string: {
    email: () => i18n.t`emailInvalid`,
    min: ({ min }) => i18n.t('minLengthMustBe', { length: min }),
    max: ({ max }) => i18n.t('maxLengthMustBe', { length: max }),
  },
});

export default yup;
