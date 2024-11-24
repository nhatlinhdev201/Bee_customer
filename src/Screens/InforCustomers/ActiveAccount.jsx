import React from "react";
import { View } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import FormActiveAccount from "../../components/forms/FormActiveAccount";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import MainStyles from "../../styles/MainStyle";
import { Header } from "../../components/HeaderComp";

const ActiveAccount = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerTitle="Xác thực đăng ký" backBtnVisible={false} />

      <LayoutGradientBlue>
        <KeyboardAwareScrollView
          contentContainerStyle={MainStyles.containerLogin}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <FormActiveAccount />
        </KeyboardAwareScrollView>
      </LayoutGradientBlue>
    </View>
  );
};

export default ActiveAccount;
