import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { colors, themeColors } from "../../styles/Colors";
import { CarouselItem } from "../../components/ImageSliderBox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box";
import MainStyles, { SCREEN_HEIGHT } from "../../styles/MainStyle";
import UserHeader from "../../components/UserHeader";
import { ScreenNames, StorageNames } from "../../Constants";
import { mainAction } from "../../Redux/Action";
import { consoleLog, getData, prints, removeData, setData } from "../../Utils";
import { dataNewServiceDefault, dataSliderDefault } from "../data";
import AlertModalFaceId from "../../components/AlertModalFaceId";
import TouchID from "react-native-touch-id";
import { OVG_FBRT_GEtTotalOrders } from "../../firebaseService/ListenOrder";
import { ServiceNews } from "../../components/home";
import { MenuScroll } from "./Menu/MenuScroll";
import { TouchableOpacity } from "react-native";
import Right from "../../components/svg/Right";
import LayoutBackgroundImage from "../../components/layouts/LayoutBackgroundImage";

const HomeScreen = () => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const dispatch = useDispatch();
  const acceptedOrder = useSelector((state) => state.main.acceptedOrder);
  const customerId = useSelector((state) => state.main.customerId) || null;
  const menu = useSelector((state) => state.main.menuService);
  const [loadingUser, setLoadingUser] = useState(false);

  const [dataNewService, setDataNewService] = useState(
    dataNewServiceDefault
  );

  const [isVisiableModalFace, setIsVisiableModalFace] = useState(false);
  const [dataCarousel, setDataCarousel] = useState(dataSliderDefault);

  useEffect(() => {
    fetchMenuData();
    Shop_spWeb_Slides_List();
    Shop_spWeb_News_List();
    // checkFaceIDAvailability();
    OVG_spAddress_List_By_Customer();
    CheckUser();

    return () => {

    }
  }, []);
  useFocusEffect(() => {
    OVG_FBRT_GEtTotalOrdersGet();

    return () => {

    }
  });

  //#region check router 
  const CheckUser = async () => {
    try {
      setLoadingUser(true);
      // await removeData(StorageNames.IS_OLD_USER);
      const userLogin = await getData(StorageNames.USER_PROFILE);
      const customerId = await getData(StorageNames.CUSTOMER_ID);
      mainAction.userLogin(userLogin, dispatch);
      mainAction.customerId(customerId, dispatch);
      setLoadingUser(false)
    } catch (error) {
      setLoadingUser(false)
    }
  }
  //
  //#region lấy dạnh sách vị trí đã đặt trước đó
  const OVG_spAddress_List_By_Customer = async () => {
    try {
      const location = await getData(StorageNames.LOCATION);
      if (location?.length > 0) {
        return;
      }
      const pr = {
        CustomerId: userLogin?.Id,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spAddress_List_By_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.length > 0) {
        let arrLocation = result.slice(0, 4).map((item, index) => ({
          Id: index + 1,
          Latitude: item.latitude,
          Longitude: item.longitude,
          Address: item.name,
          Selected: false,
          Type: item?.type ? item?.type : "Nhà ở",
          HouseNumber: item?.houseNumber ? item?.houseNumber : item?.name,
        }))
        arrLocation[0].Selected = true;
        await setData(StorageNames.LOCATION, arrLocation);
      }
    } catch {
      //
    }
  };
  //#endregion lấy dạnh sách vị trí đã đặt trước đó


  const fetchMenuData = async () => {
    try {
      const pr = {
        ServiceId: 0,
        GroupUserId: 0,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spService_List_Menu",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (menu?.length > 0) {
        await setData(StorageNames.MENU_SERVICE, result);
      } else {
        mainAction.menuService(result, dispatch);
        await setData(StorageNames.MENU_SERVICE, result);
      }
    } catch {
      return null;
    }
  };
  // lấy số đơn dịch vụ đang làm việc
  const OVG_FBRT_GEtTotalOrdersGet = useCallback(async () => {
    try {
      const total = await OVG_FBRT_GEtTotalOrders(userLogin?.Id);
      if (total !== acceptedOrder) {
        mainAction.acceptedOrder(total, dispatch);
      }
    } catch (error) {

    }
  }, []);

  // Check Face ID
  const checkFaceIDAvailability = () => {
    try {
      TouchID.isSupported()
        .then(async (biometryType) => {
          const checkFaceId = await getData(StorageNames.CHECK_FACE_ID_ENABLED);
          if (biometryType === "FaceID") {
            customerId !== null && checkFaceId !== true
              ? setIsVisiableModalFace(true)
              : setIsVisiableModalFace(false);
          }
        })
        .catch((error) => {
          // Alert.alert("Face ID is not supported", error.message);
        });
    } catch (error) {

    }
  };

  const Shop_spWeb_Slides_List = async () => {
    try {
      const listData = await getData(StorageNames.SLIDE_SHOW);
      if (listData?.length > 0) {
        setDataCarousel(listData);
      } else {
        setDataCarousel(dataSliderDefault);
      }
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_Slides_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        setData(StorageNames.SLIDE_SHOW, result)
      }
    } catch {
      //
    }
  };

  const Shop_spWeb_News_List = async () => {
    try {
      const listData = await getData(StorageNames.SERVICE_NEWS);
      if (listData?.length > 0) {
        setDataNewService(listData);
      }
      const pr = {
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "Shop_spWeb_News_List",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.length > 0) {
        await setData(StorageNames.SERVICE_NEWS, result)
      }
    } catch { }
  };

  const modalFaceId = async () => {
    setIsVisiableModalFace(false);
  };

  const handleAuthentication = () => {
    const optionalConfigObject = {
      title: "Authentication Required",
      imageColor: "#e00606",
      imageErrorColor: "#ff0000",
      sensorDescription: "Touch sensor",
      sensorErrorDescription: "Failed",
      cancelText: "Cancel",
      fallbackLabel: "Show Passcode",
      unifiedErrors: false,
      passcodeFallback: false,
    };

    try {
      TouchID.authenticate("", optionalConfigObject)
        .then(async (success) => {
          await setData(StorageNames.CHECK_FACE_ID_ENABLED, success);
          setIsVisiableModalFace(false);
        })
        .catch((error) => {
          Alert.alert("Lỗi kích hoạt vui lòng kiểm tra lại", error.message);
        });
    } catch (error) {
    }
  };

  return (
    // <View style={styles.container}>
    <LayoutBackgroundImage>
      <UserHeader loadingUser={loadingUser} />
      <ScrollView>
        {/* Slide */}
        <View>
          <View
            style={{
              borderRadius: 10,
              padding: 10,
              paddingTop: 20,
            }}
          >
            <CarouselItem dataCarousel={dataCarousel?.length > 0 ? dataCarousel : dataSliderDefault} />
          </View>
          {/* End slide */}

          {/* Menu */}
          <View
            style={[{ paddingHorizontal: 20 }, MainStyles.flexRowSpaceBetween]}
          >
            <Text style={[MainStyles.title]}>Dịch vụ</Text>
            {/* <TouchableOpacity
              style={[MainStyles.flexRowFlexStartAlignCenter, {padding: 8}]}
            >
              <Text style={[MainStyles.title]}>Xem thêm</Text>
              <Right color={themeColors.primary} size={15} />
            </TouchableOpacity> */}
            <View></View>
          </View>

          <MenuScroll />

          <Box height={SCREEN_HEIGHT * 0.02} />

          {/* End Menu */}

          {/* bài viết mới */}
          <View
            style={[{ paddingHorizontal: 20 }, MainStyles.flexRowSpaceBetween]}
          >
            <Text style={[MainStyles.title]}>Tin nổi bật</Text>
            <TouchableOpacity
              onPress={() => {
                navi.navigate(ScreenNames.NEWS_SCREEN);
              }}
              style={[MainStyles.flexRowFlexStartAlignCenter, { padding: 8 }]}
            >
              <Text style={[MainStyles.title]}>Xem thêm</Text>
              <Right color={themeColors.primary} size={15} />
            </TouchableOpacity>
          </View>
          <ServiceNews
            dataNewService={dataNewService?.length > 0 ? dataNewService : dataNewServiceDefault}
            onItemPress={(item) => {
              navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, {
                article: item,
              });
            }}
          />
          {/* <ServiceCarousel
            dataNewService={userLogin?.Phone === USER_TEST ? dataNewService : dataNewServiceDefault}
            onItemPress={(item) => {
              navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, {
                article: item,
              });
            }}
          /> */}
        </View>
        {/* End bài viết mới */}
      </ScrollView>
      {/* {!customerId ? (
        <LayoutBottom>
          <View style={{ backgroundColor: colors.WHITE }}>
            <BtnDouble
              title1={"Đăng nhập"}
              title2={"Đăng ký"}
              onConfirm1={() => navi.navigate(ScreenNames.LOGIN)}
              onConfirm2={() => navi.navigate(ScreenNames.REGISTER)}
            />
            <View style={MainStyles.flexRowCenter}>
              <Text
                style={[
                  styles.title,
                  {
                    marginBottom: 10,
                    width: SCREEN_WIDTH * 0.7,
                    textAlign: "center",
                  },
                ]}
              >
                Bạn cần đăng nhập để sử dụng dịch vụ của Ong Vàng
              </Text>
            </View>
          </View>
        </LayoutBottom>
      ) : null} */}
      <AlertModalFaceId
        Header={"Mở khoá bằng gương mặt"}
        isVisible={isVisiableModalFace}
        Title={"Sử dụng gương mặt để mở khoá ứng dụng"}
        onpressLeftButton={() => {
          modalFaceId();
        }}
        onpressRightButton={() => {
          handleAuthentication();
        }}
      />
    </LayoutBackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
