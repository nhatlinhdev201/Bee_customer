import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { FormatMoney, GOOGLE_API_KEY, consoleLog, dateTimeFormat } from "../../Utils";
import Loading from "../../components/Loading";
import BtnDouble from "../../components/BtnDouble";
import {
  delivery_Golden,
  ic_coin,
  logo_bee_blue,
  pin_outline,
} from "../../assets";
import { colors, themeColors } from "../../styles/Colors";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { ScreenNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { OVG_FBRT_GetOrderById } from "../../firebaseService/ListenOrder";
import { Avatar, Icon } from "@ui-kitten/components";
import { GenerateStatusOrder } from "../../Utils/GenerateStatusOrder";
import { APIImage } from "../../Config/Api";
import ModalConfirm from "../../components/ModalConfirm";
import _ from "lodash";
import { Header } from "../../components/HeaderComp";
import Box from "../../components/Box";

const ViewStaffScreen = () => {
  const navi = useNavigation();
  const route = useRoute();
  const { data, previous } = route.params || {};
  const [timeOut, setTimeOut] = useState({ distance: 0, duration: 0 });
  const [clientOrder, setClientOrder] = useState({});
  const [loading, setLoading] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data?.OrderId) {
      getOrder();
    }
  }, [data?.OrderId])

  const getOrder = async () => {
    setLoading(1);
    if (data?.OrderId) {
      const snapshot = await OVG_FBRT_GetOrderById(data?.OrderId);
      if (snapshot) {
        setClientOrder(snapshot);
      }
    }
    setLoading(2);
  }
  const getOrderRealtime = useCallback(() => {
    try {
      if (data?.OrderId) {
        const fetchOrderData = async () => {
          const snapshot = await OVG_FBRT_GetOrderById(data?.OrderId);
          if (!_.isNil(snapshot) && !_.isEqual(snapshot, clientOrder)) {
            setClientOrder(snapshot);
          }
          if (!_.isNil(snapshot) && snapshot?.StatusOrder === 3) {
            setMessage(`Nhân viên ${snapshot?.StaffName} đã bắt đầu làm việc.`)
          } else {
            setMessage('')
          }
        };

        const intervalId = setInterval(fetchOrderData, 5000);

        return () => {
          clearInterval(intervalId);
        };
      }
    } catch (error) {

    }
  }, [data?.OrderId]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getOrderRealtime();

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }, [])
  );

  const mapView = useMemo(
    () => (
      <MapView
        style={styles.map}
        region={{
          latitude: data?.LatitudeCustomer,
          longitude: data?.LongitudeCustomer,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        zoomEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: data?.LatitudeCustomer,
            longitude: data?.LongitudeCustomer,
          }}
          title={data?.DataService?.Address}
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
                latitude: data?.LatitudeCustomer,
                longitude: data?.LongitudeCustomer,
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
      <View style={[MainStyles.contentContainerClient, { paddingBottom: 0 }]}>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
            Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
          </Text>
        </View>
        {data?.BookingCode ? (
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: themeColors.textMain,
              fontWeight: "bold",
            }}
          >
            {data?.BookingCode}
          </Text>
        ) : null}
        <View style={MainStyles.flexRowCenter}>
          <View style={MainStyles.line} />
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="people-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Số lượng nhân viên: {data?.DataService?.StaffTotal || 0} nhân viên
            </Text>
          </View>
        </View>
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="pin-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Địa chỉ: {data?.DataService?.Address}
            </Text>
          </View>
        </View>
        {
          data?.CreateAt && (
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="calendar-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Thời gian tạo: {dateTimeFormat(data?.CreateAt, 2)}
                </Text>
              </View>
            </View>
          )
        }

      </View>
    ),
    [clientOrder]
  );
  const renderStaffInfo = useCallback(
    () =>
      (clientOrder && clientOrder?.StaffId !== "") ? (
        <View style={{ padding: 10, paddingTop: 0 }}>
          <View
            style={[
              MainStyles.cardStaff,
              { borderWidth: 0, backgroundColor: colors.WHITE },
            ]}
          >
            <View
              style={[
                MainStyles.flexRowFlexStart,
                { justifyContent: "space-between", alignItems: "center" },
              ]}
            >
              <View>
                {clientOrder?.StaffName && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="person-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Tên nhân viên:{" "}
                        {clientOrder?.StaffName || "Không xác định"}
                      </Text>
                    </View>
                  </View>
                )}
                {clientOrder?.StaffPhone && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="phone-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số điện thoại:{" "}
                        {clientOrder?.StaffPhone || "Chưa có thông tin"}
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
                      {GenerateStatusOrder(clientOrder.StatusOrder || 0)}
                    </Text>
                  </View>
                </View>
              </View>
              {clientOrder?.StaffAvatar ? (
                <Avatar
                  source={{ uri: APIImage + clientOrder?.StaffAvatar }}
                  size="giant"
                  style={{ marginRight: 10 }}
                />
              ) : (
                <Avatar
                  source={logo_bee_blue}
                  size="giant"
                  style={{ marginRight: 20 }}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[{ alignContent: "center" }, MainStyles.cardConfirmContainer]}
        >
          <Loading />
          <Text style={[MainStyles.textCardJob, { textAlign: "center" }]}>
            Đang tìm Nhân viên
          </Text>
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
      <Header headerTitle="Thông tin nhân viên" backBtnVisible={true} />
      {clientOrder && (
        <>
          <ScrollView>
            <View style={styles.mapContainer}>{mapView}</View>
            <ScrollView>
              {renderOrderDetails()}
              {renderStaffInfo()}
              <Box height={ SCREEN_HEIGHT * 0.1}/>
            </ScrollView>
          </ScrollView>
          <LayoutBottom>
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
                {FormatMoney(data?.DataService?.PriceAfterDiscount)} VND
              </Text>
            </View>
            <BtnDouble
              style={MainStyles.btnConfirm}
              onConfirm1={() =>
                navi.goBack()
              }
              title1="Quay lại"
              btn2Visible={false}
            />
          </LayoutBottom>
          <ModalConfirm
            title={message}
            isModalVisible={message !== ""}
            setModalVisible={() => setMessage("")}
            onConfirm={() => {
              setMessage("");
              if (clientOrder?.StatusOrder === 3 && loading === 2) {
                navi.navigate(ScreenNames.MAIN_NAVIGATOR);
              } else {
                navi.navigate(ScreenNames.RATING_SERVICE, { data: clientOrder });
              }
            }}
            backdropClose={false}
          />
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

export default ViewStaffScreen;
