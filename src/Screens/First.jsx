import { Image, SafeAreaView, View, StyleSheet, Text } from "react-native";
import LogoBee from "../components/LogoBee";
import { colors, themeColors } from "../styles/Colors";
import { useEffect } from "react";
import { ScreenNames, StorageNames, USER_TEST } from "../Constants";
import { consoleLog, getData, setData } from "../Utils";
import { useNavigation } from "@react-navigation/native";
import { mainAction } from "../Redux/Action";
import { useDispatch } from "react-redux";
import React from "react";
import { SCREEN_HEIGHT } from "../styles/MainStyle";
import Loading from "../components/Loading";
import Box from "../components/Box";
import { Spinner } from "@ui-kitten/components";
const First = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getRouter = async () => {
      try {
        const isOld = await getData(StorageNames.IS_OLD_USER);
        if (isOld) {
          const userLogin = await getData(StorageNames.USER_PROFILE);
          const customerId = await getData(StorageNames.CUSTOMER_ID);

          mainAction.userLogin(userLogin, dispatch);
          mainAction.customerId(customerId, dispatch);
          await ensureMenuData();
          if (customerId) {
            navi.reset({
              index: 0,
              routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
            });
          } else {
            navi.reset({
              index: 0,
              routes: [{ name: ScreenNames.HOME }],
            });
          }
        } else {
          navi.reset({
            index: 0,
            routes: [{ name: ScreenNames.ABOUT }],
          });
        }
      } catch (error) {
        console.error("Failed to fetch the user from AsyncStorage:", error);
      }
    };

    const ensureMenuData = async () => {
      const menuData = await getData(StorageNames.MENU_SERVICE);
      if (menuData) {
        mainAction.menuService(menuData, dispatch);
        fetchMenuData();
      } else {
        const rs = await fetchMenuData();
        mainAction.menuService(rs, dispatch);
        await setData(StorageNames.MENU_SERVICE, rs);
      }
    };

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
        return result;
      } catch {
        return null;
      }
    };

    getRouter();
  }, []);

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <View style={styles.content}>
  //       <LogoBee />
  //       <View style={styles.sloganContainer}>
  //         <Text style={styles.sloganBlue}>ĐẶT LỊCH LIỀN TAY</Text>
  //         <Text style={styles.sloganOrange}>ONG VÀNG TỚI NGAY</Text>
  //         <View style={{marginTop: 20, marginBottom: SCREEN_HEIGHT *0.4}}>
  //           <Spinner />
  //         </View>

  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imageContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  sloganContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sloganBlue: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#1e88e5', // Màu xanh dương
    textAlign: 'center',
  },
  sloganOrange: {
    fontSize: 24,
    textShadowColor: themeColors.textYellow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: themeColors.textYellow, // Màu cam
    textAlign: 'center',
  },
});

export default First;
