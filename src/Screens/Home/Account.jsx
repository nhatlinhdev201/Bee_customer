import {
  Linking,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, themeColors } from "../../styles/Colors";
import { ScreenNames, StorageNames } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import { prints, removeData, Version_Customer } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import Box from "../../components/Box";
import ModalConfirm from "../../components/ModalConfirm";
import ModalEditUser from "../../components/modal/ModalEditUser";
import { UserProfile } from "../../components";
import { Header } from "../../components/HeaderComp";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import BtnDouble from "../../components/BtnDouble";

const Account = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const userLogin = useSelector((state) => state.main.userLogin);


  const handleLogout = async () => {
    try {
      await removeData(StorageNames.CUSTOMER_ID);
      await removeData(StorageNames.USER_PROFILE);
      await removeData(StorageNames.SERVICE_CONFIRM);
      await removeData(StorageNames.LOCATION);
      mainAction.userLogin(null, dispatch);
      navi.reset({
        routes: [{ name: ScreenNames.LOGIN }],
      });
    } catch {
      //
    }
  };
  const handleClearAccount = async () => {
    // await removeData(StorageNames.USER_PROFILE);
    // mainAction.userLogin(null, dispatch);
    await removeData(StorageNames.CUSTOMER_ID);
      await removeData(StorageNames.USER_PROFILE);
      await removeData(StorageNames.SERVICE_CONFIRM);
      await removeData(StorageNames.LOCATION);
      mainAction.userLogin(null, dispatch);
    navi.navigate(ScreenNames.FIRST);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <Header headerTitle="Tài khoản của tôi" backBtnVisible={false} />
      <ScrollView>
        {
          userLogin?.Id ? (
            <>
              <UserProfile setModalEditUser={() => setModalEditUser(true)} />

              <TouchableOpacity
                style={[MainStyles.flexRowSpaceBetween, {
                  backgroundColor: colors.WHITE,
                  padding: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  ...MainStyles.shadow,
                  marginTop: 20
                }]}
                onPress={() => {
                  Linking.openURL(`tel:${"0922277782"}`);
                }}
              >
                <View
                  style={[MainStyles.flexRowFlexStartAlignCenter]}
                >
                  <Icon
                    style={[MainStyles.CardIcon, { marginRight: 10 }]}
                    fill={themeColors.icon}
                    name="phone-outline"
                  />
                  <Text style={MainStyles.labelTitle}>Gọi tổng đài</Text>
                </View>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="arrow-ios-forward-outline"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainStyles.flexRowSpaceBetween, {
                  backgroundColor: colors.WHITE,
                  padding: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  ...MainStyles.shadow
                }]}
                onPress={handleLogout}
              >
                <View
                  style={[MainStyles.flexRowFlexStartAlignCenter]}
                >
                  <Icon
                    style={[MainStyles.CardIcon, { marginRight: 10 }]}
                    fill={themeColors.icon}
                    name="log-out-outline"
                  />
                  <Text style={MainStyles.labelTitle}>Đăng xuất</Text>
                </View>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="arrow-ios-forward-outline"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainStyles.flexRowSpaceBetween, {
                  backgroundColor: colors.WHITE,
                  padding: 10,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  ...MainStyles.shadow
                }]}
                onPress={() => setIsModalVisible(true)}
              >
                <View
                  style={[MainStyles.flexRowFlexStartAlignCenter]}
                >
                  <Icon
                    style={[MainStyles.CardIcon, { marginRight: 10 }]}
                    fill={themeColors.cancel}
                    name="trash-2-outline"
                  />
                  <Text style={[MainStyles.labelTitle, { color: themeColors.cancel }]}>Xóa tài khoản</Text>
                </View>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.cancel}
                  name="arrow-ios-forward-outline"
                />
              </TouchableOpacity>
            </>

          ) : (
            <View style={{ backgroundColor: themeColors.lightBackground, padding: 10, marginTop: 10, borderRadius: 10 }}>
              <View style={MainStyles.flexRowCenter}>
                <Text
                  style={[
                    {
                      marginBottom: 10,
                      width: SCREEN_WIDTH * 0.7,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: themeColors.textMain,
                    },
                  ]}
                >
                  Đăng nhập hoặc đăng ký để sử dụng dịch vụ
                </Text>
              </View>
              <BtnDouble
                title1={"Đăng nhập"}
                title2={"Đăng ký"}
                bgColor1={themeColors.success}
                bgColor2={themeColors.confirm}
                onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
                onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
              />
            </View>
          )
        }
        <View style={MainStyles.flexRowCenter}>
          <Text style={MainStyles.version}>{Version_Customer}</Text>
        </View>
      </ScrollView>
      <ModalConfirm
        title={
          "Bạn  có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"
        }
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onConfirm={handleClearAccount}
        backdropClose={true}
      />
      <ModalEditUser
        isModalVisible={modalEditUser}
        setModalVisible={setModalEditUser}
        onConfirm1={() => { }}
        onConfirm2={() => { }}
      />
      <Box height={SCREEN_HEIGHT * 0.1} bgColor={colors.WHITE} />
    </View>
  );
};

export default Account;

