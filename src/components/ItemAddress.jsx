import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, themeColors } from "../styles/Colors";
import { ic_placeholder } from "../assets";
import ArrowRight from "./svg/ArrowRight";
import { Icon } from "@ui-kitten/components";

const ItemAddress = ({ data = [], onPress = () => { } }) => {
  // Giới hạn số lượng item hiển thị tối đa là 7
  const itemsToShow = data.slice(0, 7);
  return (
    <View>
      {itemsToShow.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.container}
          onPress={() => onPress(item)}
        >
          {/* <Image source={ic_placeholder} style={styles.iconLeft} /> */}
          <Icon
            style={styles.iconLeft}
            fill={themeColors.icon}
            name="pin-outline"
          />
          <View style={styles.containerContent}>
            <Text style={styles.title}>{item?.name}</Text>
          </View>
          <View style={styles.iconRight}>
            <ArrowRight color={themeColors.icon} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ItemAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 12,
    borderRadius: 5,
    width: "98%",
  },
  containerContent: {
    width: "80%",
  },
  title: {
    color: themeColors.textBlack,
    fontSize: 16,
  },
  iconLeft: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  iconRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
