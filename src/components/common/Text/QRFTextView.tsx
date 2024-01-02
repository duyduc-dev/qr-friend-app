import { Text, TextProps } from '@rneui/themed';

import TextUtil from './TextUtil';
import { TextAlign, TextFontWeight } from './types';

type Props = {
  fontWeight?: TextFontWeight;
  align?: TextAlign;
  italic?: boolean;
  fontSize?: string | number;
  lineHeight?: number;
  color?: string;
};

const QRFTextView = (props: Props & TextProps) => {
  const {
    children,
    fontWeight,
    italic,
    style,
    align,
    fontSize,
    lineHeight,
    color,
    ..._props
  } = props;
  return (
    <Text
      {..._props}
      style={TextUtil.getStyle({
        style,
        align,
        fontSize,
        color,
        fontWeight,
        italic,
        lineHeight,
      })}
    >
      {children}
    </Text>
  );
};

export default QRFTextView;
