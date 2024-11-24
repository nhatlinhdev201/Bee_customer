import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../styles/Colors";
import Box from "../../components/Box";
import {
  SCREEN_HEIGHT,
} from "../../styles/MainStyle";
import { ic_gift, ic_group } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import RankProgress from "../../components/RankProgress";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../Constants";
import { Header } from "../../components/HeaderComp";

const Welfare = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const navi = useNavigation();

  return (
    <View style={styles.container}>
      <Header headerTitle="Phúc lợi Ong Vàng" backBtnVisible={false} />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <RankProgress points={userLogin?.TotalPoint} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navi.navigate(ScreenNames.GIFT_DETAIL)}
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginRight: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                }}
              >
                Quà tặng
              </Text>
              <Image
                source={ic_gift}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Nhận vô vàn quà tặng khi tích điểm trên ứng dụng và đổi quà cùng
                Ong Vàng !
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                backgroundColor: colors.WHITE,
                marginTop: 10,
                marginLeft: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => {
                navi.navigate(ScreenNames.CONTRIBUTIONS_DETAIL);
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.MAIN_BLUE_CLIENT,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Trở thành đối tác
              </Text>
              <Image
                source={ic_group}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  color: colors.MAIN_BLUE_CLIENT,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Cơ hội hợp tác và quảng bá thương hiệu của bạn trên ứng dụng Ong
                Vàng ngay hôm nay !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
    </View>
  );
};

export default Welfare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.MAIN_BLUE_CLIENT,
  },
  text2: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.MAIN_COLOR_CLIENT,
  },
});
