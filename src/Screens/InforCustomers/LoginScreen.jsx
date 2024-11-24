import React from "react";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import LoginForm from "../../components/forms/LoginForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import MainStyles from "../../styles/MainStyle";
import { Header } from "../../components/HeaderComp";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerTitle="Đăng nhập" backBtnVisible={false} />

      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={200}
          enableOnAndroid={true}
        >
          <LoginForm />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </View>
  );
};

export default LoginScreen;
