import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../styles/Colors";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import ArrowRight from "./svg/ArrowRight";
import { useNavigation, useRoute } from "@react-navigation/native";
import { memo } from "react";
import { StatusBar } from "react-native";
import { Icon } from "@ui-kitten/components";
import { bg_bg5 } from "../assets";

const HeaderComp = ({
  backBtnVisible = true,
  headerTitle = "Tiêu đề",
  iconRightVisible = false,
  statusBarColor = themeColors.header,
}) => {
  const navi = useNavigation();
  return (
    <ImageBackground source={bg_bg5} resizeMode="cover"
      style={{
        paddingTop: Platform.OS === "android" ? SCREEN_HEIGHT * 0.02 : SCREEN_HEIGHT * 0.04,
        backgroundColor: themeColors.header,
        paddingHorizontal: 10,
        paddingBottom: 10
      }}
    >
      <StatusBar backgroundColor={statusBarColor} />
      <View style={[MainStyles.flexRowSpaceBetween]}>
        <View>
          {
            backBtnVisible && (
              <TouchableOpacity
                onPress={() => {
                  navi.goBack();
                }}
              >
                {/* <ArrowLeft color={themeColors.iconc} size={28} /> */}
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.textHeader}
                  name="arrow-ios-back-outline"
                />
              </TouchableOpacity>
            )
          }
        </View>
        <Text style={styles.textTitle}>{headerTitle}</Text>
        <View>
          {
            iconRightVisible && (
              <TouchableOpacity>
                <ArrowRight color={themeColors.iconc} size={28} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: themeColors.textHeader,
    fontSize: 18,
    fontWeight: "600",
  }
})
export const Header = memo(HeaderComp);