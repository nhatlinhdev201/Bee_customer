import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import { Icon } from "@ui-kitten/components";
import { colors, themeColors } from "../../styles/Colors";
import BeeFlying from "../BeeFlying";
import {
  check,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import IntentLauncher from "react-native-intent-launcher";
import Button from "../buttons/Button";
import Geolocation from "@react-native-community/geolocation";

const BlockModal = ({
  title,
  isModalVisible,
  isCheckLocation = false,
  isCheckInternet = false,
  onRetry,
}) => {
  useEffect(() => {
    let intervalId;

    if (isModalVisible && isCheckLocation) {
      // Thiết lập interval để gọi onRetry mỗi 5 giây
      intervalId = setInterval(() => {
        onRetry();
      }, 5000);
    }

    // Dọn dẹp interval khi modal không còn hiển thị
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isModalVisible]);

  const handleLocationButtonPress = async () => {
    try {
      // Kiểm tra quyền truy cập vị trí
      const permissions = await check(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (permissions === RESULTS.GRANTED) {
        // Quyền đã được cấp, kiểm tra xem vị trí có được bật không
        Geolocation.getCurrentPosition(
          (position) => {
            Alert.alert(
              "Vị trí đã được bật",
              "Vị trí hiện tại của bạn đã được lấy thành công."
            );
            console.log(position);
          },
          (error) => {
            if (error.code === 1 || error.code === 2) {
              Alert.alert(
                "Vị trí không được bật",
                "GPS của bạn đang tắt. Bạn có muốn đi đến cài đặt để bật không?",
                [
                  { text: "Hủy", style: "cancel" },
                  {
                    text: "OK",
                    onPress: () => {
                      if (Platform.OS === "ios") {
                        Linking.openURL("App-Prefs:root=Privacy&path=LOCATION");
                      } else {
                        // Dùng Intent cho Android
                        IntentLauncher.startActivity({
                          action: "android.settings.LOCATION_SOURCE_SETTINGS",
                        });
                      }
                    },
                  },
                ],
                { cancelable: true }
              );
            } else {
              console.log("Lỗi khi lấy vị trí: ", error.message);
            }
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        // Quyền chưa được cấp, yêu cầu quyền truy cập
        const permissionsToRequest = {
          [Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]: PERMISSIONS.REQUEST,
        };

        const results = await requestMultiple(
          Object.keys(permissionsToRequest)
        );

        // Kiểm tra kết quả yêu cầu quyền
        const locationPermission =
          results[
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          ];

        if (locationPermission === RESULTS.GRANTED) {
          // Quyền đã được cấp sau khi yêu cầu
          handleLocationButtonPress();
        } else {
          Alert.alert(
            "Quyền truy cập vị trí",
            "Ứng dụng cần quyền truy cập vị trí để hoạt động đúng. Vui lòng cấp quyền trong cài đặt.",
            [
              {
                text: "Thiết lập",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
        }
      }
    } catch (error) {
      console.log("Lỗi khi kiểm tra quyền truy cập vị trí: ", error.message);
    }
  };

  // const handleLocationButtonPress = async () => {
  //   try {
  //     // Kiểm tra quyền truy cập vị trí
  //     const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     if (result === RESULTS.DENIED) {
  //       // Yêu cầu quyền truy cập vị trí
  //       const requestResult = await request(
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //       );
  //       if (requestResult === RESULTS.GRANTED) {
  //         // Quyền đã được cấp
  //         onRetry();
  //       } else {
  //         // Quyền bị từ chối, mở trang cài đặt
  //         Alert.alert(
  //           "Quyền truy cập vị trí bị từ chối",
  //           "Vui lòng cấp quyền truy cập vị trí trong cài đặt.",
  //           [
  //             { text: "Hủy", style: "cancel" },
  //             { text: "Cài đặt", onPress: () => openSettings() },
  //           ]
  //         );
  //       }
  //     } else if (result === RESULTS.BLOCKED) {
  //       // Quyền bị chặn, mở trang cài đặt
  //       Alert.alert(
  //         "Quyền truy cập vị trí bị chặn",
  //         "Vui lòng cấp quyền truy cập vị trí trong cài đặt.",
  //         [
  //           { text: "Hủy", style: "cancel" },
  //           { text: "Cài đặt", onPress: () => openSettings() },
  //         ]
  //       );
  //     } else if (result === RESULTS.GRANTED) {
  //       // Quyền đã được cấp
  //       onRetry();
  //     }
  //   } catch (error) {
  //     console.error("Failed to check or request location permission", error);
  //   }
  // };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onRetry}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={MainStyles.flexRowCenter}>
          <View style={styles.line} />
        </View>
        <View style={MainStyles.flexRowCenter}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <BeeFlying />
        {isCheckInternet ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginHorizontal: 2 }}>
              <Button
                fontSize={14}
                paddingHorizontal={10}
                paddingVertical={8}
                bgColor={themeColors.header}
                onPress={() => {
                  IntentLauncher.startActivity({
                    action: "android.settings.WIFI_SETTINGS",
                  });
                }}
              >
                <View style={MainStyles.flexRowCenter}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill="#FFFF"
                    name="wifi-outline"
                  />
                  <Text style={{ color: colors.WHITE, textAlign: "center" }}>
                    {"  "}Kiểm tra kết nối
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: "row" }}>
              {/*  */}

              <View style={{ flex: 1, marginHorizontal: 2 }}>
                <Button
                  fontSize={14}
                  paddingHorizontal={10}
                  paddingVertical={8}
                  bgColor={themeColors.secondary}
                  onPress={() => {
                    handleLocationButtonPress();
                  }}
                >
                  <View style={MainStyles.flexRow}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill="#FFFF"
                      name="sync-outline"
                    />
                    <Text style={{ color: colors.WHITE, textAlign: "center" }}>
                      {"  "}Kiểm tra cài đặt
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: SCREEN_HEIGHT * 0.45,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  line: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    marginBottom: 15,
  },
  title: {
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: themeColors.confirm,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#6c757d",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BlockModal;
