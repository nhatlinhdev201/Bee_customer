import { useSafeAreaInsets } from "react-native-safe-area-context";

export const UseInset = () => {
  const inset = useSafeAreaInsets();
  return inset;
};
