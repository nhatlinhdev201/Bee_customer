import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, themeColors } from "../styles/Colors";
import { useNavigation } from "@react-navigation/native";
import MainStyles, { SCREEN_WIDTH } from "../styles/MainStyle";
import { Icon } from "@ui-kitten/components";

export const CardLocation = ({ location, inline = false, line = 2}) => {
  return (
    <View
      style={styles.container}
    >
      <View style={MainStyles.rowMargin}>
        <View style={MainStyles.flexRowFlexStart}>
          <Icon
            style={MainStyles.CardIcon}
            fill={themeColors.icon}
            name="pin-outline"
          />
          <Text 
          numberOfLines={inline ? 1 : line}
          ellipsizeMode="tail"
          style={[MainStyles.textCardLocation, {color: themeColors.textBlack}]}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CardLocation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    minWidth: SCREEN_WIDTH * 0.95
  },
  containerContent: {},
  title: {
    color: colors.BLACK,
    paddingRight: 25,
    fontSize: 16,
  },
  subTitle: {
    color: colors.GRAY,
    fontSize: 13,
  },
  iconLeft: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});
