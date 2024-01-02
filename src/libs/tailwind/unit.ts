const MAX_SPACING_SIZE = 1000;
const MIN_SPACING_SIZE = -1000;
const _unitSize = {};

for (let size = MIN_SPACING_SIZE; size <= MAX_SPACING_SIZE; size++) {
  // @ts-ignore
  _unitSize[size] = size.toString();
}

const unitSize = _unitSize;

export { unitSize };
