import { memo, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { mainAction } from "../../Redux/Action";
import { FlatList, Pressable, StyleSheet, View, Text, ScrollView } from "react-native";
import { themeColors } from "../../styles/Colors";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import FastImage from "react-native-fast-image";
import { Header } from "../../components/HeaderComp";
import Box from "../../components/Box";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../Constants";
import { SpinerLoading } from "../../components";
import { AlertToaster } from "../../Utils/AlertToaster";
import { ServiceNews } from "../../components/home";
import { TouchableOpacity } from "react-native";
import Right from "../../components/svg/Right";
import { dataNewServiceDefault } from "../data";

const ITEM_HEIGHT = 150; // Giảm chiều cao mỗi bài viết
const ITEM_MARGIN = 10; // Khoảng cách giữa các bài viết
const IMAGE_WIDTH = SCREEN_WIDTH * 0.3; // Ảnh chiếm 30% chiều rộng
const CONTENT_WIDTH = SCREEN_WIDTH - IMAGE_WIDTH - ITEM_MARGIN * 2; // Nội dung chiếm phần còn lại

const NewsCopm = () => {
    const navi = useNavigation();
    const [dataNewService, setDataNewService] = useState([]);
    const dispatch = useDispatch();
    const [apiLoading, setApiLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Thêm state để quản lý hiệu ứng hover

    useEffect(() => {
        Shop_spWeb_News_List();
    }, []);

    const Shop_spWeb_News_List = async () => {
        setApiLoading(true);
        try {
            const pr = { GroupId: 10060 };
            const params = { Json: JSON.stringify(pr), func: "Shop_spWeb_News_List" };
            const result = await mainAction.API_spCallServer(params, dispatch);
            if (result.length > 0) {
                setDataNewService(result);
                setApiLoading(false);
            } else {
                setApiLoading(false);
                AlertToaster("warning", "Không có dữ liệu");
            }
        } catch {
            setApiLoading(false);
            AlertToaster("error", "Lỗi! Liên hệ IT");
        }
    };

    // Hàm render mỗi item trong FlatList
    const renderItem = useCallback(({ item }) => (
        <Pressable
            // onPressIn={() => setIsHovered(true)} // Khi nhấn vào card, bật hiệu ứng hover
            // onPressOut={() => setIsHovered(false)} // Khi bỏ nhấn, tắt hiệu ứng hover
            onPress={() => navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, { article: item })}
            style={[styles.cardContainer, isHovered && styles.cardContainerHovered]} // Áp dụng hover khi trạng thái isHovered là true
        >
            <View style={styles.card}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item?.ImageNewsShow,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.low
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item?.MetaDescription}
                    </Text>
                    <Text style={styles.description} numberOfLines={3}>
                        {item?.NewsDescriptionEn}
                    </Text>
                </View>
            </View>
        </Pressable>
    ), [isHovered, navi]);

    return (
        <View style={{ flex: 1 }}>
            <Header headerTitle="Tin tức Ong Vàng" backBtnVisible={false} />
            {apiLoading ? (
                <SpinerLoading />
            ) : dataNewService.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>Không có dữ liệu</Text>
                </View>
            ) : (
                <ScrollView style={styles.container}>
                    {/* <FlatList
                        data={dataNewService}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => <Box height={SCREEN_HEIGHT * 0.05} />}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                    /> */}
                    <ServiceNews
                        limit={20}
                        dataNewService={dataNewService?.length > 0 ? dataNewService : dataNewServiceDefault}
                        onItemPress={(item) => {
                            navi.navigate(ScreenNames.SERVICE_CAROUSEL_DETAIL, {
                                article: item,
                            });
                        }}
                    />
                </ScrollView>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    cardContainer: {
        flexDirection: "row",
        marginBottom: ITEM_MARGIN,
        backgroundColor: themeColors.lightBackground,
        borderRadius: 12, // Tăng góc bo tròn
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,  // Bóng nhẹ
        shadowRadius: 6,
        elevation: 8, // Đảm bảo bóng đổ trên Android
        marginVertical: 5, // Thêm khoảng cách giữa các thẻ
    },
    cardContainerHovered: {
        transform: [{ translateY: -3 }], // Di chuyển nhẹ lên khi hover (hoặc nhấn)
    },
    card: {
        flexDirection: "row",
        width: "100%",
        height: ITEM_HEIGHT,
    },
    image: {
        width: IMAGE_WIDTH,
        height: ITEM_HEIGHT,
        borderTopLeftRadius: 12,  // Bo tròn cho góc trên trái
        borderBottomLeftRadius: 12, // Bo tròn cho góc dưới trái
    },
    textContainer: {
        flex: 1,
        padding: ITEM_MARGIN,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: themeColors.textMain,
        marginBottom: 6,
        lineHeight: 22, // Khoảng cách giữa các dòng để dễ đọc hơn
    },
    description: {
        fontSize: 14,
        color: themeColors.textBlack,
        lineHeight: 20,
        marginTop: 4, // Tạo khoảng cách giữa tiêu đề và mô tả
    },
    noDataContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataText: {
        fontSize: 18,
        color: themeColors.textBlack,
    },
});

export const News = memo(NewsCopm);
