import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { CardLocation } from "../../components";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { pin_outline } from "../../assets";
import Box from "../../components/Box";
import BackButton from "../../components/BackButton";
import Geolocation from "@react-native-community/geolocation";
import Loading from "../../components/Loading";
import { Icon } from "@ui-kitten/components";
import GetLocationTitle from "../../Utils/GetLocationTitle";
import { useSelector } from "react-redux";

const ViewMyMap = () => {
  const navigation = useNavigation();
  // ref điều khiển MapView
  const mapRef = useRef(null);
  // xác định trạng thái onRegionChange
  const [move, setMove] = useState(false);

  // Lấy thông tin vị trí hiện tại từ redux gồm {address, latitude, longitude}
  const locationTime = useSelector((state) => state.main.locationTime);

  const [region, setRegion] = useState({
    latitude: locationTime?.latitude || 0,
    longitude: locationTime?.longitude || 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [region1, setRegion1] = useState({
    latitude: locationTime?.latitude || 0,
    longitude: locationTime?.longitude || 0,
    address: locationTime.address
  });

  useEffect(() => {
    goToCurrentLocation();
    setRegion({
      ...region,
      latitude: locationTime?.latitude,
      longitude: locationTime?.longitude,
    });
  }, []);

  // Khi bản đồ bắt đầu di chuyển
  const onRegionChangeStart = () => {
    if (!move) {
      setMove(true);
    }
  };

  // Hàm xử lý khi dừng di chuyển mao
  const onRegionChangeComplete = async (newRegion) => {
    if (move) setMove(false);
    // lấy tên địa chỉ từ lat long nhận được
    const locationTitle = await GetLocationTitle(newRegion.latitude, newRegion.longitude);
    setRegion1(locationTitle);
  };

  // Xử lý focus màn hình về lại vị trí hiện tại
  const goToCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };

        setRegion(newRegion);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: false, timeout: 20000 }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton color={colors.BLACK} />
      <View style={styles.fixedCenter}>
        <Loading
          source={pin_outline}
          style={{ width: 64, height: 64 }}
        />
      </View>
      <ScrollView>
        <View>
          <MapView
            ref={mapRef}  // ref điều khiển map
            style={styles.map}
            region={region}
            onRegionChange={onRegionChangeStart}
            onRegionChangeComplete={onRegionChangeComplete}
            zoomEnabled={true}
          >
            {/* Đánh dấu vị trí hiện tại */}
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title={locationTime.address}
            >
              <View style={styles.markerContainer}>
                <View style={styles.circle}>
                  <Icon
                    style={styles.icon}
                    fill="#3366FF"
                    name="radio-button-on"
                    animation={"pulse"}
                  />
                </View>
              </View>
            </Marker>
          </MapView>
          {/* Nút đưa màn hình focus về vị trí hiện tại */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={goToCurrentLocation}
            >
              <View style={styles.buttonNowLocation}>
                <Icon
                  style={styles.icon}
                  fill="#3366FF"
                  name="navigation-2"
                  animation={"pulse"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={MainStyles.flexRowCenter}>
          <Text style={[MainStyles.titleCardJob, { textAlign: "center", marginVertical: 10 }]}>
            Xem vị trí
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: colors.primary[700],
            fontWeight: "bold",
          }}
        >
          Vị trí hiện tại: {locationTime.address}
        </Text>
        <View style={MainStyles.flexRowCenter}>
          <View style={MainStyles.line} />
        </View>
        <CardLocation
          onPress={() => navigation.goBack()}
          location={region1?.address}
        />
        <View style={styles.bodyContainer}>
          <Box height={80} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonNowLocation: {
    backgroundColor: 'rgba(51, 102, 255, 0.2)',
    padding: 10,
    borderRadius: 50,
  },
  fixedCenter: {
    position: "absolute",
    top: '37%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 9999,
  },
  map: {
    height: SCREEN_HEIGHT / 1.3,
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
  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: SCREEN_WIDTH / 13,
    flex: 1,
    marginTop: SCREEN_HEIGHT / -81,
    backgroundColor: colors.WHITE,
  },
  topBar: {
    position: "absolute",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT / 81,
    marginHorizontal: SCREEN_WIDTH / 110,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -32,
    marginTop: -32,
    position: "absolute",
    top: "50%",
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(51, 102, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    right: 10,
    zIndex: 10,
    elevation: 10,
  },
});

export default ViewMyMap;