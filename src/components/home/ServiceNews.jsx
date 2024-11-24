import React, { memo } from "react";
import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { themeColors } from "../../styles/Colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.45; 

const ServiceNewsComp = ({ dataNewService = [], onItemPress = () => { }, limit = 4 }) => {
    return (
        <View style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.gridContainer}>
                {dataNewService.slice(0, limit).map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.cardContainer}
                        onPress={() => {
                            onItemPress(item);
                        }}
                    >
                        <View style={styles.card}>
                            <FastImage
                                style={styles.image}
                                source={{ uri: item?.ImageNewsShow }}
                                resizeMode={FastImage.resizeMode.cover}
                                priority={FastImage.priority.normal}
                                cache={FastImage.cacheControl.immutable}
                            />
                            <View style={styles.textOverlay}>
                                <Text style={styles.title}>
                                    {limitTitle(item?.MetaDescription, 50)}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Căn đều 2 cột
    },
    cardContainer: {
        width: ITEM_WIDTH,
        marginBottom: 15, // Khoảng cách giữa các hàng
    },
    card: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff", // Màu nền trắng
        elevation: 3, // Đổ bóng nhẹ trên Android
        shadowColor: "#000", // Đổ bóng nhẹ trên iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: "100%",
        height: 150, // Chiều cao ảnh
    },
    textOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 210, 0, 0.9)",
        padding: 10,
    },
    title: {
        color: themeColors.textMain,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
});

const limitTitle = (title, limit) => {
    if (title?.length > limit) {
        return title.substring(0, limit) + "...";
    }
    return title;
};


export const ServiceNews = memo(ServiceNewsComp)