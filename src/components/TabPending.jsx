import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardNewJob from "./CardNewJob";
import Modal from 'react-native-modal';
import CardDefault from "./CardDefault";
import MainStyles from "../styles/MainStyle";
import { useState } from "react";
import { Icon, Spinner } from "@ui-kitten/components";
import { GenerateStatusOrder } from "../Utils/GenerateStatusOrder";
import { ScrollView } from "react-native-gesture-handler";
import Box from "./Box";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { useSelector } from "react-redux";
import { themeColors } from "../styles/Colors";

const TabPending = ({ dataPending = [], loadingPending = true }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [StaffInformation, setStaffInformation] = useState(null);
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);

  return (
    <>
      {
        loadingPending ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: themeColors.lightBackground }}>
            <Spinner />
          </View>
        ) : (
          <View style={{ flex: 1, padding: 10 }}>
            {dataPending?.length > 0 ? (
              <FlatList
                style={MainStyles.mdBottom_flatList}
                data={dataPending}
                renderItem={({ item }) => (
                  <CardNewJob data={item} setModalVisible={setModalVisible} setStaffInformation={setStaffInformation} />
                )}
                keyExtractor={(item) => item?.BookingId}
              />
            ) : (
              <CardDefault title={ userLogin?.Id > 0 ? "Bạn chưa đặt dịch vụ nào" : "Đăng nhập để sử dụng dịch vụ"} />
            )}
            <Modal
              isVisible={modalVisible}
              onBackdropPress={() => setModalVisible(false)}
              onBackButtonPress={() => setModalVisible(false)}
              backdropOpacity={0.3}
              style={MainStyles.mdBottom_modal}
            >
              <View style={MainStyles.mdBottom_modalContent}>
                <View style={MainStyles.mdBottom_dragHandle} />
                <View style={MainStyles.flexRowCenter}>
                  <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
                    Thông tin nhân viên
                  </Text>
                </View>
                <Box style={{ marginBottom: 10 }} />
                <ScrollView>
                  {
                    StaffInformation?.StaffInformation?.length > 0
                    && StaffInformation?.StaffInformation?.map((item, index) => (
                      <View style={MainStyles.cardStaff} key={index}>
                        {item?.StaffName && (
                          <View style={MainStyles.rowMargin}>
                            <View style={MainStyles.flexRowFlexStart}>
                              <Icon
                                style={MainStyles.CardIcon}
                                fill={themeColors.icon}
                                name="person-outline"
                              />
                              <Text style={MainStyles.textCardJob}>
                                Tên nhân viên: {item?.StaffName || "Chưa có nhân viên nhận đơn"}
                              </Text>
                            </View>
                          </View>
                        )}
                        {item?.StaffPhone && (
                          <View style={MainStyles.rowMargin}>
                            <View style={MainStyles.flexRowFlexStart}>
                              <Icon
                                style={MainStyles.CardIcon}
                                fill={themeColors.icon}
                                name="phone-outline"
                              />
                              <Text style={MainStyles.textCardJob}>
                                Số điện thoại: {item?.StaffPhone || "Chưa có thông tin"}
                              </Text>
                            </View>
                          </View>
                        )}
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill={themeColors.icon}
                              name="flash-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              {GenerateStatusOrder(item.StatusOrder || 0)}
                            </Text>
                          </View>
                        </View>
                        {item?.StaffPhone && (
                          <View style={MainStyles.flexRowCenter}>
                            {
                              item?.StatusOrder === 1 ||
                                item?.StatusOrder === 2 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalVisible(false);
                                    navi.navigate(
                                      ScreenNames.VIEW_STAFF,
                                      {
                                        data: {
                                          ...StaffInformation,
                                          OrderId: item?.OrderId
                                        },
                                      }
                                    )
                                  }}
                                >
                                  <View style={[MainStyles.flexRowCenter, MainStyles.cardBtnViewLocation]}>
                                    <Icon
                                      style={MainStyles.CardIcon}
                                      fill="#FFFFFFFF"
                                      name="navigation-2-outline"
                                    />
                                  </View>
                                </TouchableOpacity>
                              ) : null
                            }
                            <TouchableOpacity
                              onPress={() => {
                                Linking.openURL(`tel:${item?.StaffPhone}`);
                              }}
                            >
                              <View style={[MainStyles.flexRowCenter, MainStyles.cardPhoneCall]}>
                                <Icon
                                  style={MainStyles.CardIcon}
                                  fill="#FFFFFFFF"
                                  name="phone-outline"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ))
                  }
                </ScrollView>
              </View>
            </Modal>
          </View >
        )
      }

    </>
  );
};

export default TabPending;
