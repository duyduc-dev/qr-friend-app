import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import tw from '@/libs/tailwind';

export type QRFPopRef = {
  open: () => void;
  close: () => void;
};

export type Measure = { x: number; y: number; width: number; height: number };
export type Offset = { top: number; left: number };

type QRFChildren = ReactNode | ((p: { active: boolean }) => ReactNode);
type RenderPopupProps = {
  active: boolean;
  data: any;
};
type RenderPopup = (p: RenderPopupProps) => ReactNode;

export type QRFPopupProps = {
  children: QRFChildren;
  overlayColor?: string | 'transparent';
  activeOpacity?: number;
  offset?: Partial<Offset> | ((measureButton: Measure) => Partial<Offset>);
  placement?: 'bottom-center' | 'bottom-start' | 'bottom-end';
  render: RenderPopup;
  onChange?: (active: boolean) => void;
  onMeasure?: (m: Measure) => void;
  ignoreStatusBarHeight?: boolean;
  dataPopup?: any;
};

const QRFPopup = forwardRef<QRFPopRef, QRFPopupProps>((props, ref) => {
  const {
    children,
    activeOpacity = 0.9,
    offset = { top: 0, left: 0 },
    placement = 'bottom-center',
    overlayColor = 'rgba(0,0,0,0.4)',
    ignoreStatusBarHeight,
    render,
    onChange,
    onMeasure,
    dataPopup,
  } = props;

  const [visible, setVisible] = useState(false);
  const [measureButton, setMeasureButton] = useState<Measure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [measurePopup, setMeasurePopup] = useState<Measure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const buttonRef = useRef<TouchableOpacity>(null);
  const popupRef = useRef<View>(null);

  const getOffsetPopup = (): Offset => {
    const os = typeof offset === 'function' ? offset(measureButton) : offset;
    return {
      top: os.top || 0,
      left: os.left || 0,
    };
  };
  const handleClose = () => {
    setVisible(false);
    onChange?.(false);
  };
  const handlePressButton = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const _measure = { x: pageX, y: pageY, width, height };
      setMeasureButton(_measure);
      onMeasure?.(_measure);
      setVisible(true);
      onChange?.(true);
    });
  };
  const handleLayoutPopup = () => {
    popupRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      setMeasurePopup({ x: pageX, y: pageY, width, height });
    });
  };
  const getPositionPopup = (): Offset => {
    const ofs = getOffsetPopup();
    const statusBarHeight = ignoreStatusBarHeight
      ? 0
      : StatusBar.currentHeight ?? 0;
    switch (placement) {
      case 'bottom-center':
        return {
          top:
            measureButton.y + measureButton.height + ofs.top + statusBarHeight,
          left:
            measureButton.width / 2 + measureButton.x - measurePopup.width / 2,
        };
      case 'bottom-start':
        return {
          top:
            measureButton.y + measureButton.height + ofs.top + statusBarHeight,
          left: measureButton.x,
        };
      case 'bottom-end':
        return {
          top:
            measureButton.y + measureButton.height + ofs.top + statusBarHeight,
          left: measureButton.x + measureButton.width - measurePopup.width,
        };
    }
  };

  const RenderChildren = ({ child }: { child: QRFChildren }) =>
    typeof child === 'function' ? child({ active: visible }) : child;

  useImperativeHandle(ref, () => ({
    open: () => handlePressButton(),
    close: () => handleClose(),
  }));

  return (
    <TouchableOpacity
      ref={buttonRef}
      onPress={handlePressButton}
      activeOpacity={activeOpacity}
    >
      <RenderChildren child={children} />

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        <Pressable
          onPress={handleClose}
          style={[
            tw`absolute top-0 left-0 right-0 bottom-0`,
            {
              backgroundColor:
                overlayColor !== 'transparent' ? overlayColor : '#00000000',
            },
          ]}
        />
        <View
          ref={popupRef}
          onLayout={handleLayoutPopup}
          style={[tw`absolute`, { ...getPositionPopup() }]}
        >
          {render({ active: visible, data: dataPopup })}
        </View>
      </Modal>
    </TouchableOpacity>
  );
});

export default QRFPopup;
