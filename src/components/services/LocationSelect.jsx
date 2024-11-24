import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import { FlatList, ImageBackground, Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ScreenNames } from "../../Constants";
import { themeColors } from "../../styles/Colors";
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import Down from "../svg/Down";
import { Icon } from "@ui-kitten/components";
import { bg_bg5 } from "../../assets";

const LocationSelectComp = ({
    initData = [],
    locationSelect = {},
    setLocationSelect = () => { },
    isModalVisible = false,
    setModalVisible = () => { },
    onOption = () => { },
}) => {

    const navi = useNavigation();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleLocationSelect = (location) => {
        setLocationSelect(location);
        toggleModal();
    };

    return (
        <ImageBackground source={bg_bg5} resizeMode="cover" style={{
            paddingTop: Platform.OS === "android" ? SCREEN_HEIGHT * 0.02 : SCREEN_HEIGHT * 0.04,
            backgroundColor: themeColors.header,
            paddingHorizontal: 10,
            width: SCREEN_WIDTH,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
        }}
        >
            <StatusBar backgroundColor={themeColors.header} />
            <View style={[MainStyles.flexRowSpaceBetween]}>
                <TouchableOpacity style={{}} onPress={() => navi.goBack()}>
                    <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.textHeader}
                        name="arrow-ios-back-outline"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[{ maxWidth: '80%' }, MainStyles.flexRowFlexStartAlignCenter]}
                    onPress={toggleModal}
                >
                    <View>
                        <View style={MainStyles.flexRowFlexStartAlignCenter}>
                            <Icon
                                style={[{ width: 16, height: 16, marginRight: 5 }]}
                                fill={themeColors.textHeader}
                                name="pin-outline"
                            />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ fontSize: 14, marginRight: 5, color: themeColors.textHeader }}
                            >Vị trí của tôi</Text>
                            <Down color={themeColors.textHeader} fill={"none"} size={12} strokeWidth={3} />
                        </View>
                        {
                            initData?.length > 0 ? (
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.addressText}
                                >{locationSelect?.Address || initData.find((item) => item?.Selected)?.Address}</Text>
                            ) : (
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.addressText}
                                >{locationSelect?.Address || "Thêm vị trí của tôi"}</Text>
                            )
                        }


                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={onOption}>
                    <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.textHeader}
                        name="alert-circle-outline"
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    card: {
    },
    addressText: {
        fontSize: 16,
        color: themeColors.textHeader,
        fontWeight: "500",
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        height: SCREEN_HEIGHT * 0.5,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '50%',
    },
    locationCard: {
        backgroundColor: '#e6e6e6',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#555',
    },
});
export const LocationSelect = memo(LocationSelectComp);