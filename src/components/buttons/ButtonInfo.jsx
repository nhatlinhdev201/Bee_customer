import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, themeColors } from "../../styles/Colors";

const ButtonInfo = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: themeColors.confirm,
        },
        styles.button,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginRight: 10,
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: "600",
  },
  icon: {
    marginLeft: 5,
  },
  arrow: {},
});

export default ButtonInfo;
