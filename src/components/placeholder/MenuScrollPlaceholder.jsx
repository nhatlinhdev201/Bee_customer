import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Animated } from "react-native";

const ITEMS_COUNT = 4; // Số lượng item trong menu

export const MenuScrollPlaceholder = () => {
  const [loading, setLoading] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Chạy animation
    const startAnimation = () => {
      animation.setValue(0);
      Animated.loop(
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        })
      ).start();
    };

    startAnimation();

    // return () => {
    //   clearTimeout(timer);
    //   animation.stop();
    // };
  }, [animation]);

  const renderPlaceholderItems = () => {
    return Array.from({ length: ITEMS_COUNT }).map((_, index) => (
      <View key={index} style={styles.itemContainer}>
        <Animated.View
          style={[
            styles.placeholderIcon,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.placeholderText,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? renderPlaceholderItems() : (
          <View style={styles.itemContainer}>
            {/* Render dữ liệu thực tế ở đây */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
  },
  itemContainer: {
    width: 100,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#e0e0e0", // Màu nền placeholder
  },
  placeholderText: {
    width: 80,
    height: 15,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "#e0e0e0", // Màu nền placeholder
  },
});

export default MenuScrollPlaceholder;
