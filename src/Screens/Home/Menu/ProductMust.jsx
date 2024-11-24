import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { ic_star } from "../../../assets";
import { colors } from "../../../styles/Colors";
import { ProductLike } from "../../data";
import MainStyles from "../../../styles/MainStyle";

const ProductMust = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.image}
          source={
            item.image
              ? { uri: item.image }
              : { uri: "https://picsum.photos/200" }
          }
        />
        <Text style={styles.header}>{item.header}</Text>
        <View style={MainStyles.flexRowSpaceBetween}>
          <Text style={styles.price}>{`${item.price}`}</Text>
          <View style={styles.starContainer}>
            <Text style={styles.starText}>{item.star}</Text>
            <FastImage style={styles.starIcon} source={ic_star} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={ProductLike}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false} // Tắt thanh cuộn ngang
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    // elevation: 3, // Độ nổi của card (cho Android)
    shadowColor: "#000", // Màu của bóng đổ
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: colors.MAIN_BLUE_CLIENT, // Màu sắc chủ đạo là xanh dương
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT, // Màu sắc chủ đạo là xanh dương
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  starText: {
    fontSize: 14,
    color: colors.MAIN_COLOR_CLIENT, // Màu cho text ngôi sao
  },
  starIcon: {
    width: 20,
    height: 20,
    tintColor: colors.YELLOW, // Màu cho icon ngôi sao
    marginLeft: 5,
  },
});

export default ProductMust;
