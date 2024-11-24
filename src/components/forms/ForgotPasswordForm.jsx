import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";
import { colors, themeColors } from "../../styles/Colors";
import CustomFormError from "./CustomFormError";
import Button from "../buttons/Button";
import { ScreenNames } from "../../Constants";
import LogoBeeBox from "../LogoBeeBox";
import { PropTypes } from "prop-types";
import MainStyles from "../../styles/MainStyle";
import { bn_forgot_pass } from "../../assets";

const ForgotPasswordForm = ({ navigation }) => {
  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
      .required("Thông tin bắt buộc"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Thông tin bắt buộc"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Xác nhận mật khẩu không khớp")
      .required("Thông tin bắt buộc"),
  });

  const handleSubmit = async () => {
    try {

    } catch {
      //
    }
  };

  return (
    <Formik
      initialValues={{ phoneNumber: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <View style={styles.container}>
            <View style={MainStyles.viewImgFormActive}>
              <Image
                source={bn_forgot_pass}
                style={{
                  width: 400,
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <CustomLabel>Số điện thoại:</CustomLabel>
            <CustomInput
              placeholder="Nhập số điện thoại"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              borderColor={
                touched.phoneNumber && errors.phoneNumber
                  ? colors.RED
                  : colors.BLACK
              }
            />
            <CustomFormError>
              {touched.phoneNumber && errors.phoneNumber}
            </CustomFormError>

            <CustomLabel>Mật khẩu mới:</CustomLabel>
            <CustomInput
              placeholder="Nhập mật khẩu"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              type="password"
              showPasswordToggle={true}
              borderColor={
                touched.password && errors.password ? colors.RED : colors.BLACK
              }
            />
            <CustomFormError>
              {touched.password && errors.password}
            </CustomFormError>
            <CustomLabel>Xác nhận mật khẩu:</CustomLabel>
            <CustomInput
              placeholder="Xác nhận mật khẩu"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              type="password"
              showPasswordToggle={true}
              borderColor={
                touched.confirmPassword && errors.confirmPassword
                  ? colors.RED
                  : colors.BLACK
              }
            />
            <CustomFormError>
              {touched.confirmPassword && errors.confirmPassword}
            </CustomFormError>

            <Button
              bgColor={themeColors.confirm}
              textColor={themeColors.textMain}
              fontWeight="bold"
              onPress={handleSubmit}
            >{"Lấy mã OTP"}</Button>
            <View style={styles.regis}>
              <Text style={styles.regt}>Bạn có tài khoản ?</Text>
              <Pressable onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
                <Text style={styles.regtt}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  regis: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  regt: {
    fontSize: 15,
    marginRight: 10,
  },
  regtt: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.MAIN_BLUE_CLIENT,
  },
  container: {
    margin: 15,
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    color: colors.MAIN_BLUE_CLIENT,
    textAlign: "center",
    margin: 10,
    fontSize: 15,
    marginBottom: 60,
    paddingRight: 30,
    paddingLeft: 30,
  },
  dot: {
    width: 10,
    height: 5,
    borderRadius: 10,
    margin: 2,
    backgroundColor: colors.WHITE,
  },
  dotActive: {
    backgroundColor: colors.YELLOW,
    width: 20,
    height: 5,
    borderRadius: 5,
    margin: 2,
  },
  pagination: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
  },
  forgot: {
    color: colors.MAIN_BLUE_CLIENT,
  },
  viewForgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
});

ForgotPasswordForm.defaultProps = {
  setSubmit: () => { },
  navigation: {},
};
ForgotPasswordForm.propTypes = {
  setSubmit: PropTypes.func,
  navigation: PropTypes.object,
};

export default ForgotPasswordForm;
