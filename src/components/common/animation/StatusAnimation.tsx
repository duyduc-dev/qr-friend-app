import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal, View } from 'react-native';

import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import Tools from '@/utils/Tools';

type OpenOptions = {
  type?: 'success' | 'error';
  duration?: number;
  message?: string;
  onEnd?: () => void;
};

export type StatusAnimationRef = {
  open: (p?: OpenOptions) => void;
  close: () => void;
};

const StatusAnimation = forwardRef<StatusAnimationRef>((_, ref) => {
  const timeout = useRef<any>();
  const animationRef = useRef<LottieView>(null);

  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<OpenOptions>({});
  const handleOpen = (p: OpenOptions = { type: 'success', duration: 4000 }) => {
    console.log(p);
    setOptions({
      ...p,
      duration: p.duration ?? 4000,
    });
    setVisible(true);
    requestAnimationFrame(() => animationRef.current?.play());
  };

  const handleClose = () => {
    setVisible(false);
    setOptions({});
    requestAnimationFrame(() => animationRef.current?.pause());
    options.onEnd?.();
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  useEffect(() => {
    if (options.duration && visible) {
      timeout.current = setTimeout(() => {
        handleClose();
      }, options.duration);
    }

    return () => clearTimeout(timeout.current);
  }, [options.duration, visible]);

  const renderTypeAnimation = (type: 'success' | 'error' | undefined) => {
    return (
      <View
        style={tw.style(
          'w-160 h-160 rounded-full items-center justify-center',
          type === 'error' &&
            `bg-[${Tools.applyAlphaColorHex('#ff0000', 0.3)}]`,
        )}
      >
        <LottieView
          ref={animationRef}
          source={
            type === 'error'
              ? require('@/assets/animation/cross.json')
              : require('@/assets/animation/check.json')
          }
          autoPlay
          loop={false}
          speed={1}
          resizeMode="cover"
          style={{ height: 150, width: '100%' }}
        />
      </View>
    );
  };

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <BlurView
        tint="light"
        intensity={80}
        style={tw`flex-1 items-center justify-center`}
      >
        <View style={tw`items-center justify-center`}>
          {renderTypeAnimation(options.type)}
        </View>
        {options.message && (
          <View style={tw`mt-24`}>
            <QRFTextView color={colors.black} fontWeight="600" fontSize={16}>
              {options.message}
            </QRFTextView>
          </View>
        )}
      </BlurView>
    </Modal>
  );
});

export default StatusAnimation;
