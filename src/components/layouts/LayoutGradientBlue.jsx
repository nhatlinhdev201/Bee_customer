import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../styles/Colors";

const LayoutGradientBlue = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.PRIMARY_LIGHT, colors.WHITE]}
        style={styles.gradient}
      />
      {/* <Box height={Platform.OS === "android" ? 0 : SCREEN_HEIGHT * 0.02} /> */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default LayoutGradientBlue;
