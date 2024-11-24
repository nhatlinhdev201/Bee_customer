import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames, StorageNames } from "../../../Constants";
import { SCREEN_WIDTH } from "../../../styles/MainStyle";
import { themeColors } from "../../../styles/Colors";
import { APIImage_2 } from "../../../Config/Api";
import { getData } from "../../../Utils";
import MenuScrollPlaceholder from "../../../components/placeholder/MenuScrollPlaceholder";
import { default_icon } from "../../../assets";
import { DefaultMenu } from "../../data";

const ITEMS_PER_ROW = 2;
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * 0.1;


export const MenuScroll = () => {
  // const data = useSelector((state) => state.main.menuService);
  const data = DefaultMenu
  const customerId = useSelector((state) => state.main.customerId);
  const navi = useNavigation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const getService = async (item) => {
    try {
      const location = await getData(StorageNames.LOCATION);
      if (customerId) {
        if (location) {
          navi.navigate(ScreenNames.BOOKING_FORM_SCREEN, {
            service: item,
            previous: true,
          });
        } else {
          navi.navigate(ScreenNames.ADDRESS_SEARCH, { previous: true, service: item, previousScreen: ScreenNames.BOOKING_FORM_SCREEN });
        }
      } else {
        navi.navigate(ScreenNames.LOGIN);
      }
    } catch (error) { }
  }
  const renderItems = () => {
    const rows = [];
    for (let i = 0; i < data.length; i += ITEMS_PER_ROW) {
      const rowItems = data.slice(i, i + ITEMS_PER_ROW).map((item) => (
        <TouchableOpacity
          key={item?.ServiceCode}
          onPress={() => getService(item)}
          style={styles.itemContainer}
        >
          <Image
            style={styles.image}
            source={{ uri: APIImage_2 + item?.IconService }}
            defaultSource={default_icon}
          />
          <View style={styles.textContainer}>
            <Text
              numberOfLines={2}
              style={styles.text}
            >{item.ServiceName}</Text>
          </View>
        </TouchableOpacity>
      ));

      rows.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    const scrollPercentage = (contentOffset / (contentWidth - layoutWidth)) * 100;
    setScrollPosition(scrollPercentage);
  };

  return (
    <View style={styles.container}>
      {
        data?.length > 0 ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {renderItems()}
          </ScrollView>
        ) : (
          <View>
            <MenuScrollPlaceholder />
            <MenuScrollPlaceholder />
          </View>
        )
      }

      {
        data?.length > 8 ? (
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressDot,
                  { left: `${scrollPosition}%` }
                ]}
              />
            </View>
          </View>
        ) : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: themeColors.lightBackground,
    borderRadius: 10,
    margin: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "column",
  },
  itemContainer: {
    width: SCREEN_WIDTH * 0.21,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  textContainer: {
    textAlign: "center",
    width: SCREEN_WIDTH * 0.15,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  progressBar: {
    width: PROGRESS_BAR_WIDTH,
    height: 10,
    backgroundColor: themeColors.textWhite,
    borderRadius: 5,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: themeColors.textYellow,
    position: 'absolute',
    marginLeft: -5,
  },
});