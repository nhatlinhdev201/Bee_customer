import Toast from "react-native-toast-message";

export const AlertToaster = (type, title, subTitle = "") => {
  return Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
  });
};
