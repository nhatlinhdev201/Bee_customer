import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import LinearGradient from "react-native-linear-gradient";
import { themeColors } from "../../styles/Colors";
const Button = ({
  bgColor,
  textColor = "white",
  fontSize = 20,
  fontWeight = "normal",
  disable = false,
  isLoading = false,
  boderWidth = 0,
  icon: Icon,
  children = "default",
  onPress,
  ...props
}) => {
  const gradientColors = bgColor
    ? [bgColor, bgColor]
    : [themeColors.confirm,themeColors.confirm, themeColors.confirm];

  return (
    <TouchableOpacity
      {...props}
      style={({ pressed }) => [styles.button, {}, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disable}
    >
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, isLoading ? { opacity: 0.5 } : {}]}
        >
          {!isLoading ? (
            <View style={styles.content}>
              <Text
                style={{
                  ...styles.text,
                  color: textColor,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                }}
              >
                {children}
              </Text>
              {Icon && <Icon style={{ ...styles.icon }} />}
            </View>
          ) : (
            <View style={styles.content}>
              <Spinner status="primary" />
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    overflow: "hidden",
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  gradientWrapper: {
    borderRadius: 5,
    overflow: "hidden",
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginRight: 20,
  },
});

export default Button;
