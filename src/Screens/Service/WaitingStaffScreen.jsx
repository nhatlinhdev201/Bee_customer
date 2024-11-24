import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { CardLocation } from "../../components";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Box from "../../components/Box";
import {
  delivery_Golden,
  ic_coin,
  ic_location,
  logo_bee_blue,
  pin_outline,
} from "../../assets";
import Loading from "../../components/Loading";
import { FormatMoney, GOOGLE_API_KEY, customRound } from "../../Utils";
import LayoutPosition from "../../components/layouts/LayoutPosition";
import {
  completeOrder,
  listenForOrderUpdates,
} from "../../firebaseService/HandleOrder";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { ScreenNames } from "../../Constants";
import BtnDouble from "../../components/BtnDouble";

const WaitingStaffScreen = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const navi = useNavigation();
  const route = useRoute();
  const { dataBooking } = route.params || {};
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navi.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
          })
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navi])
  );

  // handle listen order change
  const [clientOrder, setClientOrder] = useState(null);
  useEffect(() => {
    listenForOrderUpdates(userLogin.Id, setClientOrder);
  }, []);

  const [timeOut, setSetTImeOut] = useState({
    distance: 0,
    duration: 0,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude: dataBooking.Latitude,
            longitude: dataBooking.Longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          zoomEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: dataBooking.Latitude,
              longitude: dataBooking.Longitude,
            }}
            title={dataBooking?.Address}
          >
            <View style={styles.markerContainer}>
              <Loading source={pin_outline} style={{ width: 64, height: 64 }} />
            </View>
          </Marker>
          {clientOrder?.LatitudeStaff ? (
            <Marker
              coordinate={{
                latitude: clientOrder?.LatitudeStaff,
                longitude: clientOrder?.LongitudeStaff,
              }}
            >
              <View style={styles.markerContainer}>
                <Loading
                  source={delivery_Golden}
                  style={{ width: 64, height: 64 }}
                />
              </View>
            </Marker>
          ) : null}
          {clientOrder?.LatitudeStaff ? (
            <MapViewDirections
              origin={{
                latitude: clientOrder?.LatitudeStaff,
                longitude: clientOrder?.LongitudeStaff,
              }}
              destination={{
                latitude: dataBooking.Latitude,
                longitude: dataBooking.Longitude,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor={colors.SUCCESS}
              onReady={(result) => {
                setSetTImeOut({
                  distance: result.distance,
                  duration: result.duration,
                });
              }}
            />
          ) : null}
        </MapView>
        <LayoutPosition style={{ top: 10, left: 10, right: 10 }}>
          <CardLocation
            onPress={() => navi.goBack()}
            location={dataBooking?.Address}
          />
        </LayoutPosition>
      </View>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={MainStyles.contentContainerClient}>
            <Text style={MainStyles.cardSubLabelConfirm}>
              Thời gian làm việc
            </Text>
            <View style={MainStyles.cardConfirmContainer}>
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Mã dịch vụ </Text>
                <Text style={MainStyles.cardTitleConfirm}>
                  {clientOrder?.BookingCode}
                </Text>
              </View>
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>tên dịch vụ </Text>
                <Text style={MainStyles.cardTitleConfirm}>
                  {clientOrder?.DataService?.ServiceName}
                </Text>
              </View>
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Ngày làm việc</Text>
                <Text style={MainStyles.cardTitleConfirm}>Ngay bây giờ</Text>
              </View>
              <Box height={10} />
              <View style={MainStyles.flexRowSpaceBetween}>
                <Text style={MainStyles.cardTitleConfirm}>Loại dịch vụ</Text>
                <Text style={MainStyles.cardTitleConfirm}>
                  {dataBooking?.IsPremium
                    ? "Dịch vụ Premium"
                    : "Dịch vụ thường"}
                </Text>
              </View>
            </View>
            <Text style={MainStyles.cardLabelConfirm}>Tổng tiền</Text>
            <View
              style={[
                MainStyles.cardConfirmContainer,
                MainStyles.flexRowCenter,
              ]}
            >
              <Image source={ic_coin} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  color: colors.MAIN_COLOR_CLIENT,
                  marginLeft: 10,
                  fontSize: 17,
                  fontWeight: "700",
                }}
              >
                {FormatMoney(dataBooking?.PriceAfterDiscount)} VND
              </Text>
            </View>
            <Text style={MainStyles.cardSubLabelConfirm}>Nhân viên</Text>
            {clientOrder && clientOrder?.StaffId !== "" ? (
              <>
                <View
                  style={[
                    MainStyles.flexRowFlexStart,
                    { alignContent: "center" },
                    MainStyles.cardConfirmContainer,
                  ]}
                >
                  <Image
                    source={logo_bee_blue}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text
                        style={{
                          color: colors.MAIN_BLUE_CLIENT,
                          fontSize: 15,
                          width: 120,
                        }}
                      >
                        Mã đơn dịch vụ :
                      </Text>
                      <Text
                        style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}
                      >
                        {clientOrder?.BookingCode}
                      </Text>
                    </View>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text
                        style={{
                          color: colors.MAIN_BLUE_CLIENT,
                          fontSize: 15,
                          width: 120,
                        }}
                      >
                        Nhân viên :
                      </Text>
                      <Text
                        style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}
                      >
                        {clientOrder?.StaffName}
                      </Text>
                    </View>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text
                        style={{
                          color: colors.MAIN_BLUE_CLIENT,
                          fontSize: 15,
                          width: 120,
                        }}
                      >
                        SĐT :
                      </Text>
                      <Text
                        style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}
                      >
                        {clientOrder?.StaffPhone}
                      </Text>
                    </View>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text
                        style={{
                          color: colors.MAIN_BLUE_CLIENT,
                          fontSize: 15,
                          width: 120,
                        }}
                      >
                        Mã nhân viên :
                      </Text>
                      <Text
                        style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}
                      >
                        {clientOrder?.StaffId}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    MainStyles.flexRowCenter,
                    { alignContent: "center" },
                    MainStyles.cardConfirmContainer,
                  ]}
                >
                  <Image
                    source={ic_location}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                  />
                  <Text>
                    {clientOrder?.StaffName} sẽ đến trong{" "}
                    {customRound(timeOut.duration)} Phút
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={[
                    { alignContent: "center" },
                    MainStyles.cardConfirmContainer,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.MAIN_BLUE_CLIENT,
                      fontSize: 15,
                    }}
                  >
                    Đang đợi nhân viên nhận đơn
                  </Text>
                  <Loading />
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <LayoutBottom>
        <BtnDouble
          // btn2Visible={clientOrder && clientOrder?.StaffId !== "" ? false : true}
          title1={"Về trang chủ"}
          btn2Visible={false}
          title2={"Hủy đơn"}
          onConfirm1={() => navi.navigate(ScreenNames.MAIN_NAVIGATOR)}
          onConfirm2={() => {
            completeOrder(clientOrder?.OrderId);
            navi.navigate(ScreenNames.MAIN_NAVIGATOR);
          }}
        />
      </LayoutBottom>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  deliverytext: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.DARK,
  },
  deliveryContainer: {
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 30,
  },
  toText: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: SCREEN_HEIGHT / 135,
  },
  progressLine: {
    height: 4,
    width: SCREEN_WIDTH / 5.3,
    backgroundColor: colors.SUCCESS,
    borderRadius: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: SCREEN_HEIGHT / 25,
  },
  bodyContainer: {},
  detailContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 14,
    flexDirection: "row",
    paddingVertical: SCREEN_HEIGHT / 58,
    paddingHorizontal: SCREEN_WIDTH / 23,
    marginTop: SCREEN_HEIGHT / 55,
  },
  motorContaniner: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 12,
    paddingHorizontal: SCREEN_WIDTH / 25,
    paddingVertical: SCREEN_HEIGHT / 54,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.DARK,
  },
  detailSubTitle: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: SCREEN_HEIGHT / 102,
  },
  detailTextContainer: {
    flex: 1,
    marginStart: SCREEN_WIDTH / 31,
  },
  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverText: {
    fontWeight: "600",
    color: colors.DARK,
  },
  driverStatus: {
    color: colors.GRAY,
    fontSize: 12,
    marginTop: SCREEN_HEIGHT / 101,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 41,
    justifyContent: "space-between",
  },
  phoneContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.CANCEL2,
    borderRadius: 14,
    paddingHorizontal: SCREEN_WIDTH / 31,
    paddingVertical: SCREEN_HEIGHT / 67,
    backgroundColor: colors.CANCEL2,
  },
  markerContainer: {
    // backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH / 47,
    paddingVertical: SCREEN_HEIGHT / 101,
  },
  topBar: {
    position: "absolute",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 81,
    marginHorizontal: SCREEN_WIDTH / 110,
  },
  btnTitle: {
    fontSize: 18,
    color: colors.WHITE,
  },
});

export default WaitingStaffScreen;
