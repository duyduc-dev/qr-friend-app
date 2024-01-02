import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Mulish_200ExtraLight,
  Mulish_200ExtraLight_Italic,
  Mulish_300Light,
  Mulish_300Light_Italic,
  Mulish_400Regular,
  Mulish_400Regular_Italic,
  Mulish_500Medium,
  Mulish_500Medium_Italic,
  Mulish_600SemiBold,
  Mulish_600SemiBold_Italic,
  Mulish_700Bold,
  Mulish_700Bold_Italic,
  Mulish_800ExtraBold,
  Mulish_800ExtraBold_Italic,
  Mulish_900Black,
  Mulish_900Black_Italic,
} from '@expo-google-fonts/mulish';
import { useFonts } from 'expo-font';
const useLoadFont = () => {
  const [fontsLoaded, error] = useFonts({
    Mulish_200ExtraLight,
    Mulish_200ExtraLight_Italic,
    Mulish_300Light,
    Mulish_300Light_Italic,
    Mulish_400Regular,
    Mulish_400Regular_Italic,
    Mulish_500Medium,
    Mulish_500Medium_Italic,
    Mulish_600SemiBold,
    Mulish_600SemiBold_Italic,
    Mulish_700Bold,
    Mulish_700Bold_Italic,
    Mulish_800ExtraBold,
    Mulish_800ExtraBold_Italic,
    Mulish_900Black,
    Mulish_900Black_Italic,
    ...FontAwesome.font,
  });

  return { fontsLoaded, error } as const;
};

export default useLoadFont;
