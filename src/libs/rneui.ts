import { createTheme } from '@rneui/themed';

import { TextUtil } from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';

export const theme = createTheme({
  components: {
    Text: {
      style: TextUtil.getFontWeight(),
    },
    Button: ({ type, disabled }) => ({
      titleStyle: TextUtil.getStyle({
        fontSize: 18,
        fontWeight: '700',
        align: 'center',
        color: type === 'clear' ? colors.primary : colors.white,
      }),
      loadingProps: {
        color: '#000',
      },
      buttonStyle: tw.style(
        'rounded-10 bg-primary',
        { 'opacity-90': !!disabled },
        type === 'solid' && 'bg-primary',
        type === 'clear' && 'bg-transparent',
      ),
    }),
    Input: ({ errorMessage, value, disabled, touched }) => {
      const isError = errorMessage !== undefined && errorMessage !== '';
      return {
        inputStyle: tw.style(
          'border-b-0 text-16',
          TextUtil.getFontWeight('600'),
        ),
        inputContainerStyle: tw.style(
          'border-b-2 border-2 rounded-10 border-grey-100 h-64  px-20 pr-35 bg-grey-100',
          {
            'border-success':
              !isError &&
              !disabled &&
              value !== '' &&
              value !== undefined &&
              !!touched,
            'border-red': isError && !disabled,
          },
        ),
        placeholderTextColor: colors.grey['600'],
        renderErrorMessage: false,
      };
    },
  },
});
