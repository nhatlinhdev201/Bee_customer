import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { FormatMoney, GOOGLE_API_KEY, customRound } from "../../Utils";
import Loading from "../../components/Loading";
import BtnDouble from "../../components/BtnDouble";
import {
  delivery_Golden,
  ic_coin,
  ic_location,
  logo_bee_blue,
  pin_outline,
} from "../../assets";
import { colors } from "../../styles/Colors";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { ScreenNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import ModalConfirm from "../../components/ModalConfirm";

const ViewLocationStaff = () => {
  const navi = useNavigation();
  const [timeOut, setTimeOut] = useState({ distance: 0, duration: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const clientOrder = {
    BookingCode: "OVG-30072409591634",
    ClientId: 874,
    CreateAt: "2024-07-30 21:59:16",
    DataService: {
      Address:
        "39B Truong Son Street, Phường 4, Tân Bình, Ho Chi Minh City, Vietnam",
      BookingCode: "OVG-30072409591634",
      BookingId: 1436,
      CustomerId: 874,
      CustomerName: "Thanh Hà",
      GroupUserId: 10060,
      IsPremium: 0,
      NoteBooking: "",
      OtherService: [],
      Payment: 0,
      PriceAfterDiscount: 230000,
      RoomTotal: 1,
      ServiceCode: "DV-06062403132645",
      ServiceId: 8,
      ServiceName: "Dọn dẹp buồng phòng",
      TimeWorking: 1,
      TotalStaff: 2,
    },
    LatitudeCustomer: 10.8093,
    LatitudeStaff: 10.861061781758963,
    LongitudeCustomer: 106.664,
    LongitudeStaff: 106.65402435416904,
    OrderId: 1436,
    StaffAvatar: "",
    StaffId: 7410,
    StaffName: "dev test",
    StaffPhone: "0906702589",
    StatusOrder: 1,
  };

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

  // Memoize the MapView component to avoid unnecessary re-renders
  const mapView = useMemo(
    () =>
      clientOrder?.LatitudeCustomer &&
      clientOrder?.LongitudeCustomer && (
        <MapView
          style={styles.map}
          region={{
            latitude: clientOrder?.LatitudeCustomer,
            longitude: clientOrder?.LongitudeCustomer,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          zoomEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: clientOrder?.LatitudeCustomer,
              longitude: clientOrder?.LongitudeCustomer,
            }}
            title={clientOrder?.DataService?.Address}
          >
            <View style={styles.markerContainer}>
              <Loading source={pin_outline} style={{ width: 64, height: 64 }} />
            </View>
          </Marker>
          {clientOrder?.LatitudeStaff && (
            <>
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
              <MapViewDirections
                origin={{
                  latitude: clientOrder?.LatitudeStaff,
                  longitude: clientOrder?.LongitudeStaff,
                }}
                destination={{
                  latitude: clientOrder?.LatitudeCustomer,
                  longitude: clientOrder?.LongitudeCustomer,
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor={colors.SUCCESS}
                onReady={(result) => {
                  setTimeOut({
                    distance: result?.distance,
                    duration: result?.duration,
                  });
                }}
              />
            </>
          )}
        </MapView>
      ),
    [clientOrder]
  );

  const renderOrderDetails = useCallback(
    () => (
      <View style={MainStyles.contentContainerClient}>
        <Text style={MainStyles.cardSubLabelConfirm}>Thời gian làm việc</Text>
        <View style={MainStyles.cardConfirmContainer}>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.cardTitleConfirm}>Mã dịch vụ </Text>
            <Text style={MainStyles.cardTitleConfirm}>
              {clientOrder?.BookingCode}
            </Text>
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.cardTitleConfirm}>Tên dịch vụ </Text>
            <Text style={MainStyles.cardTitleConfirm}>
              {clientOrder?.DataService?.ServiceName}
            </Text>
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.cardTitleConfirm}>Ngày làm việc</Text>
            <Text style={MainStyles.cardTitleConfirm}>Ngay bây giờ</Text>
          </View>
          <View style={MainStyles.flexRowSpaceBetween}>
            <Text style={MainStyles.cardTitleConfirm}>Loại dịch vụ</Text>
            <Text style={MainStyles.cardTitleConfirm}>
              {clientOrder?.DataService?.IsPremium
                ? "Dịch vụ Premium"
                : "Dịch vụ thường"}
            </Text>
          </View>
        </View>
        <Text style={MainStyles.cardLabelConfirm}>Tổng tiền</Text>
        <View
          style={[MainStyles.cardConfirmContainer, MainStyles.flexRowCenter]}
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
            {FormatMoney(clientOrder?.DataService?.PriceAfterDiscount)} VND
          </Text>
        </View>
      </View>
    ),
    [clientOrder]
  );

  const renderStaffInfo = useCallback(
    () =>
      clientOrder && clientOrder?.StaffId !== "" ? (
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
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
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
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
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
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
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
                <Text style={{ color: colors.MAIN_BLUE_CLIENT, fontSize: 15 }}>
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
            {clientOrder?.StatusOrder === 1 && (
              <Text>
                {clientOrder?.StaffName}
                {clientOrder?.StatusOrder === 1 && " đang chuẩn bị"}
              </Text>
            )}
            {clientOrder?.StatusOrder === 2 && (
              <>
                <Text>
                  {clientOrder?.StaffName}{" "}
                  {clientOrder?.StatusOrder === 2 &&
                    customRound(timeOut.duration) > 0 &&
                    ` sẽ đến trong ${customRound(timeOut.duration)} phút `}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {timeOut.distance.toFixed(2)} km
                </Text>
              </>
            )}
            {clientOrder?.StatusOrder === 3 && (
              <Text>
                {clientOrder?.StaffName}
                {clientOrder?.StatusOrder === 3 && " đã bắt đầu làm việc"}
              </Text>
            )}
          </View>
        </>
      ) : (
        <View
          style={[{ alignContent: "center" }, MainStyles.cardConfirmContainer]}
        >
          <Loading />
          <Text style={{ textAlign: "center" }}>Đang tìm Nhân viên</Text>
        </View>
      ),
    [clientOrder, timeOut]
  );

  if (!clientOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <LayoutBottom>
          <BtnDouble
            style={MainStyles.btnConfirm}
            onConfirm1={() => navi.navigate(ScreenNames.MAIN_NAVIGATOR)}
            title1="Về trang chính"
            btn2Visible={false}
          />
        </LayoutBottom>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {clientOrder && (
        <>
          <ScrollView>
            <View style={styles.mapContainer}>{mapView}</View>
            {renderOrderDetails()}
            {renderStaffInfo()}
          </ScrollView>
          <LayoutBottom>
            <BtnDouble
              style={MainStyles.btnConfirm}
              onConfirm1={() =>
                navi.reset({
                  routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
                })
              }
              title1="Về trang chính"
              btn2Visible={false}
            />
          </LayoutBottom>
          <ModalConfirm
            title={`Nhân viên ${clientOrder?.StaffName}  đã bắt đầu làm việc, quay về trang chủ !`}
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            onConfirm={() => {
              setIsModalVisible(false);
              navi.navigate(ScreenNames.MAIN_NAVIGATOR);
            }}
            backdropClose={false}
          />
          {/* <ModalConfirm
              title={`Nhân viên ${clientOrder?.StaffName}  đã nhận đơn dịch vụ và đang chuẩn bị, hãy theo dõi quãng đường để biết vị trí nhân viên!`}
              isModalVisible={isModalReloadVisible}
              setModalVisible={setIsModalReloadVisible}
              onConfirm={handleReload}
              backdropClose={false}
            /> */}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mapContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});

export default ViewLocationStaff;
