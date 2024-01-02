import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const DROPDOWN_MAX_HEIGHT = height * 0.4;

export const getDropdownHeight = (
  estSizeItem: number,
  dataLength: number,
  maxHeightDropdown: number | undefined,
) => {
  if (dataLength === 0 || estSizeItem === 0) return;
  const totalHeightDropdown = estSizeItem * dataLength;
  const DEFAULT_HEIGHT_DROPDOWN = maxHeightDropdown ?? DROPDOWN_MAX_HEIGHT;
  return totalHeightDropdown >= DEFAULT_HEIGHT_DROPDOWN
    ? DEFAULT_HEIGHT_DROPDOWN
    : totalHeightDropdown;
};
