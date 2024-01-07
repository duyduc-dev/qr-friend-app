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

type OpenOptions = {
  duration?: number;
  message?: string;
  onEnd?: () => void;
};

export type LoadingAnimationRef = {
  open: (p?: OpenOptions) => void;
  close: () => void;
};

const LoadingAnimation = forwardRef<LoadingAnimationRef>((_, ref) => {
  const loadingAnimationRef = useRef<LottieView>(null);
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<OpenOptions>({});
  const timeout = useRef<any>();

  const handleOpen = (params: OpenOptions = {}) => {
    setOptions(params);
    setVisible(true);
    requestIdleCallback(() => loadingAnimationRef.current?.play());
  };

  const handleClose = () => {
    options.onEnd?.();
    setVisible(false);
    setOptions({});
    loadingAnimationRef.current?.pause();
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  useEffect(() => {
    if (options.duration) {
      timeout.current = setTimeout(() => {
        handleClose();
      }, options.duration);
    }
    return () => clearTimeout(timeout.current);
  }, [options.duration]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent
    >
      <View style={[tw`flex-1 `]}>
        <BlurView
          intensity={80}
          tint="dark"
          style={tw`flex-1 w-full items-center justify-center`}
        >
          <LottieView
            ref={loadingAnimationRef}
            source={require('@/assets/animation/spinner.json')}
            autoPlay
            loop
            speed={0.7}
            style={tw`w-100 h-100`}
          />
          {options.message && (
            <View style={tw`mt-24`}>
              <QRFTextView color={colors.white} fontWeight="600" fontSize={16}>
                {options.message}
              </QRFTextView>
            </View>
          )}
        </BlurView>
      </View>
    </Modal>
  );
});

export default LoadingAnimation;
