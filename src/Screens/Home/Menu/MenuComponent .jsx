import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../Constants";
import { getIconById } from "../../../Utils/RoutingService";
import { SCREEN_WIDTH } from "../../../styles/MainStyle";
import { colors, themeColors } from "../../../styles/Colors";
import { dataMenu } from "../../data";

export const MenuComponent = () => {
  const navi = useNavigation();
  return (
    <View style={styles.container}>
      {dataMenu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navi.navigate(ScreenNames.ADDRESS_SEARCH, {
              service: item,
            });
          }}
          style={styles.itemContainer}
        >
          <FastImage
            style={styles.image}
            source={
              getIconById(item.ServiceId)
                ? getIconById(item.ServiceId)
                : { uri: "https://picsum.photos/200" }
            }
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.ServiceName}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    backgroundColor: themeColors.lightBackground,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.2,
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  image: {
    width: SCREEN_WIDTH * 0.19,
    height: SCREEN_WIDTH * 0.19,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.2,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 13,
    color: colors.BLACK,
    fontWeight: "500",
  },
});
