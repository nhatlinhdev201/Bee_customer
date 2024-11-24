import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { image_banner_1 } from "../assets";
import Label from "./Label";
import Box from "./Box";
import ItemTitlePremiumDes from "./ItemTitlePremiumDes";
import { premiumDescripton, standardTools } from "../Screens/data";
import { useState } from "react";
import Up from "./svg/Up";
import Down from "./svg/Down";
import { colors } from "../styles/Colors";
import MainStyles from "../styles/MainStyle";
import FastImage from "react-native-fast-image";

const CardPremiumInfomation = () => {
  const [open, setOpen] = useState(false);
  const itemStandardTool = (item) => {
    return (
      <FastImage
        style={{ width: 100, height: 100 }}
        source={
          item.image
            ? { uri: item.image }
            : { uri: "https://picsum.photos/200" }
        }
      />
    )
  }
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: colors.MAIN_BLUE_CLIENT, marginBottom: 10 }}>Dịch vụ Premium hiện chưa hỗ trợ</Text>
      <Image
        source={image_banner_1}
        style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 }}
      />
      <Box height={20} />
      <Label>Dịch vụ Premium là gì ?</Label>
      <FlatList
        data={premiumDescripton}
        renderItem={({ item }) => <ItemTitlePremiumDes item={item} />}
        keyExtractor={(item) => item.Id}
      />
      {
        open &&
        <FlatList
          data={standardTools}
          renderItem={({ item }) =>
            <FastImage
              style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
              source={
                item.image
                  ? { uri: item.image }
                  : { uri: "https://picsum.photos/200" }
              }
            />
          }
          keyExtractor={(item) => item.id}
          numColumns={3}
          key={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      }
      <Box height={20} />
      <TouchableOpacity style={[MainStyles.flexRowSpaceBetween, styles.btnReadMore]} onPress={() => setOpen(!open)}>
        <Label>Xem bộ dụng cụ dọn dẹp tiêu chuẩn</Label>
        {
          open ?
            <Up color={colors.MAIN_BLUE_CLIENT} fill="none" />
            :
            <Down color={colors.MAIN_BLUE_CLIENT} fill="none" />
        }
      </TouchableOpacity>
    </View >
  );
};
const styles = StyleSheet.create({
  btnReadMore: {
    backgroundColor: colors.GRAY,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 20,
  },
  textBtn: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 20
  },
  listContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
})
export default CardPremiumInfomation;