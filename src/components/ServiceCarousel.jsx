import React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import { themeColors } from "../styles/Colors";
import { limitTitle } from "../Utils/LimitTitle";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;

const ServiceCarousel = ({ dataNewService = [], onItemPress = () => { } }) => {
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        onItemPress(item);
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>

          <FastImage
            style={styles.image}
            source={{ uri: item?.ImageNewsShow }}  
            resizeMode={FastImage.resizeMode.cover}
            priority={FastImage.priority.normal}
            cache={FastImage.cacheControl.immutable}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {limitTitle(item?.MetaDescription, 50)}
            </Text>
            <Text style={styles.description}>
              {limitTitle(item?.NewsDescriptionEn, 120)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={dataNewService}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={ITEM_WIDTH}
        loop
        autoplay
        autoplayDelay={3000}
        autoplayInterval={3000}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        contentContainerCustomStyle={styles.carouselContentContainer}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: themeColors.lightBackground,
    overflow: "hidden",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: themeColors.primary,
  },
  cardContainer: {
    height: ITEM_WIDTH * 0.95,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: ITEM_WIDTH * 0.95,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: ITEM_WIDTH * 0.95,
    height: 180,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: themeColors.primary,
  },
  description: {
    fontSize: 14,
    color: themeColors.secondaryText,
    marginTop: 5,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: themeColors.paginationDot,
  },
  activeDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: themeColors.primary,
  },
});

export default ServiceCarousel;
