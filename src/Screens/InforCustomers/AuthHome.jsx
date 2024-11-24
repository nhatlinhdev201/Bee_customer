import React from "react";
import LayoutAbout from "../../components/layouts/LayoutAbout";
import LogoBee from "../../components/LogoBee";
import { Text, View } from "react-native";
import BtnAuth from "../../components/auth/BtnAuth";
import { colors } from "../../styles/Colors";
import { ScreenNames } from "../../Constants";
import Box from "../../components/Box";
import { PropTypes } from "prop-types";

const AuthHome = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate(ScreenNames.LOGIN);
  };
  const handleRegister = () => {
    navigation.navigate(ScreenNames.REGISTER);
  };
  return (
    <LayoutAbout>
      <Box height={30} />
      <LogoBee />
      <View
        style={{
          marginBottom: 100,
          alignItems: "center",
        }}
      >
        <BtnAuth onPress={handleLogin}>{"Đăng nhập"}</BtnAuth>
        <Text
          style={{
            color: colors.BLACK,
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Hoặc
        </Text>
        <BtnAuth onPress={handleRegister}>{"Đăng ký"}</BtnAuth>
      </View>
    </LayoutAbout>
  );
};
AuthHome.propTypes = {
  navigation: PropTypes.object,
};
export default AuthHome;
