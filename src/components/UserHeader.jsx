import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { themeColors } from "../styles/Colors";
import { useSelector } from "react-redux";
import { avt_default, bg_header, ic_point, ic_premium, logo_bee_blue } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { APIImage } from "../Config/Api";
import { PropTypes } from "prop-types";
import { ShowPoint } from "./ShowPoint";
import BtnDouble from "./BtnDouble";
import FastImage from "react-native-fast-image";
import { getData } from "../Utils";

const UserHeader = ({
  loadingUser = false,
  showPoint = true,
}) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const customerId = useSelector((state) => state.main.customerId);
  const navi = useNavigation();

  const GoLogin = async () => {
    try {
      const isOld = await getData(StorageNames.IS_OLD_USER);
      if (isOld) {
        navi.navigate(ScreenNames.LOGIN);
      } else {
        navi.navigate(ScreenNames.ABOUT, { previous: ScreenNames.LOGIN });
      }
    } catch (error) {
    }
  }

  const GoRegister = async () => {
    try {
      const isOld = await getData(StorageNames.IS_OLD_USER);
      if (isOld) {
        navi.replace(ScreenNames.REGISTER);
      } else {
        navi.replace(ScreenNames.ABOUT, { previous: ScreenNames.REGISTER });
      }
    } catch (error) {
    }
  }

  return (
    <ImageBackground source={bg_header} resizeMode="cover" style={styles.container}>
      <StatusBar backgroundColor={themeColors.header} />
      {
        loadingUser ? (
          <View>
            <View style={[MainStyles.flexRowSpaceBetween]}>
              <View>
                <View style={[MainStyles.flexRowCenter]}>
                  <Text style={[MainStyles.title1, { color: themeColors.textHeader }]}> Ong Vàng xin chào ! </Text>
                </View>
                <View style={[MainStyles.flexRowFlexStart]}>
                  <Text style={[{ fontSize: 12, fontWeight: "400", color: themeColors.textHeader }]}> Điểm tích lũy hiện tại</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <View style={[MainStyles.flexRowSpaceBetween]}>
                <View style={[MainStyles.flexRowCenter, {
                  padding: 5,
                  width: "50%",
                  borderWidth: 1,
                  borderTopColor: themeColors.textWhite,
                  borderBottomColor: themeColors.textWhite,
                  borderLeftColor: themeColors.textWhite,
                  borderRightColor: themeColors.textYellow,
                  paddingLeft: 10,
                  borderTopStartRadius: 10,
                  borderBottomStartRadius: 10,
                  backgroundColor: themeColors.lightBackground,
                }]}>
                  <View style={MainStyles.flexRow}>
                    <FastImage
                      source={ic_point}
                      style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain",
                        marginRight: 5,
                        marginVertical: 5
                      }}
                    />
                  </View>
                </View>
                <View style={[MainStyles.flexRowCenter, {
                  padding: 5,
                  width: "50%",
                  borderWidth: 1,
                  borderColor: themeColors.textWhite,
                  paddingLeft: 10,
                  borderTopEndRadius: 10,
                  borderBottomEndRadius: 10,
                  backgroundColor: themeColors.lightBackground,
                }]}>
                  <View style={MainStyles.flexRow}>
                    <FastImage
                      source={ic_premium}
                      style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain",
                        marginRight: 5,
                        marginVertical: 5
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {
              customerId ? (
                <View>
                  <View style={[MainStyles.flexRowSpaceBetween]}>
                    <View>
                      <View style={[MainStyles.flexRowFlexStart]}>
                        <Text style={[MainStyles.title1, { color: themeColors.textHeader }]}> Xin chào {userLogin?.CustomerName} </Text>
                      </View>
                      <View style={[MainStyles.flexRowFlexStart]}>
                        <Text style={[{ fontSize: 12, fontWeight: "400", color: themeColors.textHeader }]}> Điểm tích lũy hiện tại</Text>
                      </View>
                    </View>
                    {userLogin?.Avatar ? (
                      <TouchableOpacity
                        onPress={() => {
                          navi.navigate(ScreenNames.ACCOUNT);
                        }}
                      >
                        <Image
                          source={{
                            uri: APIImage + userLogin?.Avatar,
                          }}
                          style={{
                            width: SCREEN_WIDTH * 0.09,
                            height: SCREEN_WIDTH * 0.09,
                            resizeMode: "contain",
                            marginRight: 10,
                            borderRadius: SCREEN_WIDTH * 0.09,
                            borderWidth: 1,
                            borderColor: themeColors.textWhite
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navi.navigate(ScreenNames.ACCOUNT);
                        }}
                      >
                        <Image
                          source={avt_default}
                          style={{
                            width: SCREEN_WIDTH * 0.09,
                            height: SCREEN_WIDTH * 0.09,
                            resizeMode: "contain",
                            marginRight: 10,
                            borderWidth: 1,
                            borderRadius: SCREEN_WIDTH * 0.09,
                            borderColor: themeColors.textWhite
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {
                    showPoint ? (
                      <View style={{ marginTop: 15 }}>
                        <ShowPoint />
                      </View>
                    ) : null
                  }

                </View>
              ) : (
                <View>
                  <View style={[MainStyles.flexRowSpaceBetween]}>
                    <View>
                      <View style={[MainStyles.flexRowFlexStart]}>
                        <Text style={[MainStyles.title1, { color: themeColors.textHeader }]}> Ong Vàng xin chào ! </Text>
                      </View>
                      <View style={[MainStyles.flexRowFlexStart]}>
                        <Text style={[{ fontSize: 12, fontWeight: "400", color: themeColors.textHeader }]}> Đăng nhập hoạc đăng ký tài khoản để sử dụng dịch vụ</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <View style={[MainStyles.flexRowSpaceBetween]}>
                      <TouchableOpacity
                        // onPress={() => {
                        //   navi.navigate(ScreenNames.LOGIN);
                        // }}
                        onPress={GoLogin}
                        style={[MainStyles.flexRowCenter, {
                          padding: 5,
                          width: "50%",
                          borderWidth: 1,
                          borderTopColor: themeColors.textWhite,
                          borderBottomColor: themeColors.textWhite,
                          borderLeftColor: themeColors.textWhite,
                          borderRightColor: themeColors.textYellow,
                          paddingLeft: 10,
                          borderTopStartRadius: 10,
                          borderBottomStartRadius: 10,
                          backgroundColor: themeColors.lightBackground,
                        }]}>
                        <View style={MainStyles.flexRow}>
                          <Text
                            style={[{ fontSize: 16, paddingVertical: 2, fontWeight: "500", color: themeColors.textMain }]}
                          >Đăng nhập</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        // onPress={() => {
                        //   navi.navigate(ScreenNames.REGISTER);
                        // }}
                        onPress={GoRegister}
                        style={[MainStyles.flexRowCenter, {
                          padding: 5,
                          width: "50%",
                          borderWidth: 1,
                          borderColor: themeColors.textWhite,
                          paddingLeft: 10,
                          borderTopEndRadius: 10,
                          borderBottomEndRadius: 10,
                          backgroundColor: themeColors.lightBackground,
                        }]}>
                        <View style={MainStyles.flexRow}>
                          <Text
                            style={[{ fontSize: 16, paddingVertical: 2, fontWeight: "500", color: themeColors.textMain }]}
                          >Đăng ký</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            }
          </View>
        )
      }
    </ImageBackground >
  );
};

UserHeader.defaultProps = {
  totalService: 0,
};
UserHeader.propTypes = {
  totalService: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? SCREEN_HEIGHT * 0.02 : SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: 20,
    // backgroundColor: themeColors.header,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeColors.primary,
  },
  subTitle: {
    fontSize: 13,
    color: themeColors.primaryText,
  },
});
export default UserHeader;
