import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
export const units = {
  width: (dpWidth) => wp(dpWidth),
  height: (dpHeight) => hp(dpHeight),
};

export const screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
