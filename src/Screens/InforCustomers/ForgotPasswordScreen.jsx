import React from "react";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyles from "../../styles/MainStyle";
import { View } from "react-native";
import { Header } from "../../components/HeaderComp";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerTitle="Lấy lại mật khẩu" backBtnVisible={false} />
      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll={true}
          extraScrollHeight={140}
          enableOnAndroid={true}
        >
          <ForgotPasswordForm navigation={navigation} />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </View>
  );
};

export default ForgotPasswordScreen;
