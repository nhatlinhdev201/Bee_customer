import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { consoleLog, getData, GOOGLE_API_KEY, setData } from "../../Utils";
import { CardLocation } from "../../components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import { colors, themeColors } from "../../styles/Colors";
import { pin_outline } from "../../assets";
import Button from "../../components/buttons/Button";
import Box from "../../components/Box";
import ArrowRight from "../../components/svg/ArrowRight";
import Geolocation from "@react-native-community/geolocation";
import Loading from "../../components/Loading";
import { Icon } from "@ui-kitten/components";
import GetLocationTitle from "../../Utils/GetLocationTitle";
import { ScreenNames, StorageNames } from "../../Constants";
import { Header } from "../../components/HeaderComp";
import { LocationDetailModal } from "../../components/modal/LocationDetailModal";

const ShowMap = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { location } = route.params || {};
  const { service } = route.params || {};
  const { previousScreen } = route.params || '';
  // ref điều khiển MapView
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // xác định trạng thái onRegionChange
  const [move, setMove] = useState(false);
  const [locationDetail, setLocationDetail] = useState({ locationType: 'Nhà ở', houseNumber: '' });

  const [region, setRegion] = useState({
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [region1, setRegion1] = useState({
    latitude: region?.latitude || 0,
    longitude: region?.longitude || 0,
    address: location?.Address
  });

  //#region modal địa chỉ detail
  const [modalDetailVisible, setModalDetailVisible] = useState(false);

  //#end region modal địa chỉ detail
  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      getLatLong(location?.place_id);
    } else {
      setRegion({
        ...region,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
    }
  }, []);

  const getLatLong = async (place_id) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/details/json",
        {
          params: {
            place_id: place_id,
            fields: "geometry",
            key: GOOGLE_API_KEY,
          },
        }
      );
      const location = response.data.result.geometry.location;
      setRegion({
        ...region,
        latitude: location.lat,
        longitude: location.lng,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Xác nhận chọn vị trí này
  const handleNext = async () => {
    setLoading(true);
    let getLocation = await getData(StorageNames.LOCATION);

    let locationNew = {
      Id: getLocation ? getLocation.length + 1 : 1,
      Latitude: region1.latitude,
      Longitude: region1.longitude,
      Address: region1?.address,
      HouseNumber: locationDetail?.houseNumber || region1?.address,
      Type: locationDetail?.locationType,
      Selected: true
    }
    if (!getLocation) {
      await setData(StorageNames.LOCATION, [locationNew]);
    } else {
      let temp = getLocation.map((item) => {
        if (item.Selected) {
          item.Selected = false;
          return item;
        }
        return item;
      })
      await setData(StorageNames.LOCATION, [locationNew, ...temp]);
    }
    setLoading(false);
    if (previousScreen) {
      navigation.navigate(previousScreen, { service: service });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
      })
    }
  };

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
      {/* <BackButton color={themeColors.accent} /> */}
      <Header headerTitle="Xác nhận vị trí" backBtnVisible={true} />

      <View style={styles.fixedCenter}>
        <Loading
          source={pin_outline}
          style={{ width: 64, height: 64 }}
        />
      </View>
      <ScrollView>
        <View>
          <MapView
            ref={mapRef}
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
              title={location?.Address}
            >
              <View style={styles.markerContainer}>
                <View style={styles.circle}>
                  <Icon
                    style={styles.icon}
                    fill={themeColors.icon}
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

        <CardLocation
          // onPress={() => navigation.goBack()}
          location={region1?.address}
        />
        <View style={styles.bodyContainer}>
          <Box height={80} />
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          zIndex: 10,
          elevation: 10,
          backgroundColor: colors.PRIMARY_GREEN,
          width: "95%",
          margin: 10,
          borderRadius: 7,
        }}
      >
        <Button
          icon={() => <ArrowRight color={colors.WHITE} />}
          onPress={handleNext}
          // onPress={() => setModalDetailVisible(true)}
          bgColor={themeColors.confirm}
          isLoading={loading}
        >
          Chọn vị trí
        </Button>
      </View>
      <LocationDetailModal
        isVisible={modalDetailVisible}
        onClose={() => setModalDetailVisible(false)}
        locationDetail={locationDetail}
        setLocationDetail={setLocationDetail}
        onConfirm={handleNext}
      />
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
    height: SCREEN_HEIGHT * 0.7,
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
    marginTop: SCREEN_HEIGHT * 0.3,
  },
  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: SCREEN_WIDTH * 0.13,
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
export default ShowMap;