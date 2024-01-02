import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import tw from '@/libs/tailwind';

import { TextAlign, TextFontWeight } from './types';

export default class TextUtil {
  static getFontWeight(fontWeight?: TextFontWeight, italic?: boolean) {
    const list: { [key in TextFontWeight]: string } = {
      '200': 'Mulish_200ExtraLight',
      '300': 'Mulish_300Light',
      '400': 'Mulish_400Regular',
      '500': 'Mulish_500Medium',
      '600': 'Mulish_600SemiBold',
      '700': 'Mulish_700Bold',
      '800': 'Mulish_800ExtraBold',
      '900': 'Mulish_900Black',
    };
    let style = `font-${list[fontWeight || '400']}`;
    italic && (style += '_Italic');
    return tw.style(style);
  }

  static getTextAlign(align: TextAlign = 'left') {
    return tw`text-${align}`;
  }

  static getFontSize(unit: string | number = 14) {
    return tw`text-${unit}`;
  }

  static getLineHeight(unit?: number) {
    return unit || unit == 0 ? tw`leading-[${unit}px]` : tw``;
  }

  static getColor(color?: string) {
    return color ? tw`text-[${color}]` : tw``;
  }

  static getStyle(props: {
    lineHeight?: number;
    fontSize?: string | number;
    align?: TextAlign;
    fontWeight?: TextFontWeight;
    italic?: boolean;
    color?: string;
    style?: StyleProp<TextStyle>;
  }): StyleProp<TextStyle> {
    return StyleSheet.flatten([
      TextUtil.getTextAlign(props.align),
      TextUtil.getFontWeight(props.fontWeight, props.italic),
      TextUtil.getFontSize(props.fontSize),
      TextUtil.getLineHeight(props.lineHeight),
      TextUtil.getColor(props.color),
      props.style,
    ]);
  }
}
