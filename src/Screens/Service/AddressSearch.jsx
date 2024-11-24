import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputComponent } from "../../components/Input";
import { colors } from "../../styles/Colors";
import { GOOGLE_API_KEY } from "../../Utils";
import ItemAddress from "../../components/ItemAddress";
import axios from "axios";
import { ScreenNames } from "../../Constants";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import { limitTitle } from "../../Utils/LimitTitle";
import { SCREEN_WIDTH } from "../../styles/MainStyle";
import { Header } from "../../components/HeaderComp";
import FastImage from "react-native-fast-image";
import { bg_location } from "../../assets";
import { Spinner } from "@ui-kitten/components";
import Geolocation from "@react-native-community/geolocation";
import GetLocationTitle from "../../Utils/GetLocationTitle";
import BlockModal from "../../components/modal/BlockModal";

const AddressSearch = () => {
  const navi = useNavigation();
  const [loading, setLoading] = useState(false);
  const API_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const route = useRoute();
  const { previous } = route.params || false;
  const { service } = route.params || {};
  const { previousScreen } = route.params || '';
  const [dataAddressSearch, setDataAddressSearch] = useState([]);
  const dispatch = useDispatch();
  const [oldAddressSearch, setOldAddressSearch] = useState([]);
  const [statusAddressSearch, setStatusAddressSearch] = useState("basic");
  const userLogin = useSelector((state) => state.main.userLogin);
  const locationTime = useSelector((state) => state.main.locationTime);
  const [inputValue, setInputValue] = useState(locationTime?.address || "");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    OVG_spAddress_List_By_Customer();
    updateLocation();
  }, []);

  const updateLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          if (position?.coords) {
            const result = await GetLocationTitle(
              position?.coords?.latitude,
              position?.coords?.longitude
            );
            mainAction.locationUpdate(result, dispatch);
            setModalMessage("");
            setModalVisible(false);
          }
        },
        (error) => {
          setModalMessage("Không thể lấy được vị trí hiện tại, vui lòng kiểm tra quyền truy cập vị trí trên thiết bị.");
          setModalVisible(true);
        },
        { enableHighAccuracy: false, timeout: 20000 }
      );
    } catch (e) {
      setModalMessage("Không thể lấy được vị trí hiện tại, vui lòng kiểm tra quyền truy cập vị trí trên thiết bị.");
      setModalVisible(true);
    }
  };

  const OVG_spAddress_List_By_Customer = async () => {
    try {
      setLoading(true);
      const pr = {
        CustomerId: userLogin?.Id,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spAddress_List_By_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result) {
        setOldAddressSearch(result);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      //
    }
  };

  // Hàm gọi API tìm kiếm địa chỉ từ Google
  const handleSearch = async (text) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          input: text,
          key: GOOGLE_API_KEY,
          components: "country:vn",
        },
      });
      const data = response.data;
      if (data.predictions.length > 0) {
        const dataSearchLocation = data.predictions.map((item) => ({
          place_id: item.place_id,
          name: item.description,
        }));
        setDataAddressSearch(dataSearchLocation);
      } else {
        setDataAddressSearch([]);
      }
    } catch {
    }
  };

  // Hàm debounce để hạn chế số lần gọi API
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  // Hàm kiểm tra và gọi tìm kiếm
  const handleChangeText = (text) => {
    setStatusAddressSearch(text === "" ? "danger" : "basic");
    setInputValue(text);
    debouncedHandleSearch(text);
  };

  return (
    <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
      <Header headerTitle="Địa chỉ của tôi" backBtnVisible={previous} />
      <InputComponent
        btnDisable={true}
        placeholder={
          limitTitle(locationTime?.address || "", 30) || "Tìm kiếm địa chỉ..."
        }
        iconRight="navigation-2"
        inputStatus={statusAddressSearch}
        txtWarning="Vui lòng nhập địa chỉ"
        style={{
          width: "98%",
          alignSelf: "center",
        }}
        value={inputValue}
        onLeftIconPress={() => { }}
        onRightIconPress={() => {
          if (locationTime?.address) {
            let location = {
              Address: locationTime?.address,
              place_id: "",
              latitude: locationTime?.latitude,
              longitude: locationTime?.longitude,
            }

            navi.navigate(ScreenNames.SHOW_MAP, { location, service, previousScreen });
          } else {
            return;
          }
        }}
        onChangeText={handleChangeText}
      />
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.WHITE }}>
            <Spinner />
          </View>
        ) : (
          <>
            {
              (dataAddressSearch?.length > 0 || oldAddressSearch?.length > 0) ? (
                <ItemAddress
                  data={dataAddressSearch?.length ? dataAddressSearch : oldAddressSearch}
                  onPress={(item) => {
                    let location = {
                      Address: item?.name,
                      place_id: item?.place_id,
                      latitude: item?.latitude,
                      longitude: item?.longitude,
                    }

                    navi.navigate(ScreenNames.SHOW_MAP, { location, service, previousScreen });
                  }}
                />
              ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.WHITE }}>
                  <FastImage
                    source={bg_location}
                    style={{ width: SCREEN_WIDTH * 0.8, height: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              )
            }
          </>
        )
      }
      <BlockModal
        title={modalMessage}
        isModalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onRetry={updateLocation}
        isCheckLocation={true}
      />
    </View>
  );
};

export default AddressSearch;
