const { unitSize } = require('./unit');
const { colors } = require('../../constants/index');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    spacing: {
      ...unitSize,
    },
    fontSize: {
      ...unitSize,
    },
    fontFamily: {
      Mulish_200ExtraLight: ['Mulish_200ExtraLight'],
      Mulish_200ExtraLight_Italic: ['Mulish_200ExtraLight_Italic'],
      Mulish_300Light: ['Mulish_300Light'],
      Mulish_300Light_Italic: ['Mulish_300Light_Italic'],
      Mulish_400Regular: ['Mulish_400Regular'],
      Mulish_400Regular_Italic: ['Mulish_400Regular_Italic'],
      Mulish_500Medium: ['Mulish_500Medium'],
      Mulish_500Medium_Italic: ['Mulish_500Medium_Italic'],
      Mulish_600SemiBold: ['Mulish_600SemiBold'],
      Mulish_600SemiBold_Italic: ['Mulish_600SemiBold_Italic'],
      Mulish_700Bold: ['Mulish_700Bold'],
      Mulish_700Bold_Italic: ['Mulish_700Bold_Italic'],
      Mulish_800ExtraBold: ['Mulish_800ExtraBold'],
      Mulish_800ExtraBold_Italic: ['Mulish_800ExtraBold_Italic'],
      Mulish_900Black: ['Mulish_900Black'],
      Mulish_900Black_Italic: ['Mulish_900Black_Italic'],
    },
    borderWidth: {
      ...unitSize,
    },
    borderRadius: {
      ...unitSize,
      full: 9999,
      none: 0,
    },
    minHeight: {
      ...unitSize,
    },
    maxHeight: {
      ...unitSize,
    },
    minWidth: {
      ...unitSize,
    },
    maxWidth: {
      ...unitSize,
    },
    translate: {
      ...unitSize,
    },
  },
  plugins: [],
  extend: {
    lineHeight: {
      ...unitSize,
    },
  },
};
