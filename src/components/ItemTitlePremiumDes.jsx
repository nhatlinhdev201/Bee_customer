import { StyleSheet, Text, View } from "react-native"
import MainStyles from "../styles/MainStyle";
import Star from "./svg/Star";
import { colors } from "../styles/Colors";

const ItemTitlePremiumDes = ({ item }) => {
  return (
    <View style={[MainStyles.flexRowFlexStart, styles.container]}>
      <Star color={colors.MAIN_COLOR_CLIENT} size={22} fill={colors.MAIN_COLOR_CLIENT} />
      <Text style={styles.textDes}>{item.Title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 2,
    // alignItems: 'center',
  },
  textDes: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 26,
    color: colors.BLACK
  }
})

export default ItemTitlePremiumDes;