import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { colors, themeColors } from "../styles/Colors";
import { ScreenNames, StorageNames } from "../Constants";
import { useNavigation } from "@react-navigation/native";
import { removeData, Version_Customer } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../Redux/Action";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { logo_bee_blue } from "../assets";
import Box from "../components/Box";
import Button from "../components/buttons/Button";
import ModalConfirm from "../components/ModalConfirm";
import EditUser from "../components/svg/EditUser";
import ModalEditUser from "../components/modal/ModalEditUser";
import { APIImage } from "../Config/Api";
import { Avatar, Card, Icon } from "@ui-kitten/components";
import LayoutGradientBlue from "../components/layouts/LayoutGradientBlue";
import HeaderChat from "./HeaderChat";

const AccountTest = () => {
    const navi = useNavigation();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.main.userLogin);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalEditUser, setModalEditUser] = useState(false);

    const handleLogout = async () => {
        try {
            await removeData(StorageNames.CUSTOMER_ID);
            await removeData(StorageNames.SERVICE_CONFIRM);
            mainAction.userLogin(null, dispatch);
            navi.reset({
                routes: [{ name: ScreenNames.LOGIN }],
            });
        } catch {
            //
        }
    };
    const handleClearAccount = async () => {
        await removeData(StorageNames.USER_PROFILE);
        mainAction.userLogin(null, dispatch);
        navi.navigate(ScreenNames.LOGIN);
    };

    return (
        <LayoutGradientBlue>
            <HeaderChat title="Tài khoản" isVisibleBack={false} />
            {/* <Text style={{ ...MainStyles.screenTitle, color: colors.BLACK, fontSize: 25 }}>Thông tin tài khoản</Text> */}
            <ScrollView>
                <Card
                    style={styles.card}
                    disabled
                >
                    <View style={MainStyles.flexRowSpaceBetween}>
                        <Text style={MainStyles.labelTitle}>Thông tin</Text>
                        <TouchableOpacity onPress={() => setModalEditUser(true)}>
                            <EditUser size={25} />
                        </TouchableOpacity>
                    </View>
                    <Box height={SCREEN_HEIGHT * 0.02} />
                    <View style={styles.content}>
                        {userLogin?.Avatar ? (
                            <Avatar
                                source={{ uri: APIImage + userLogin?.Avatar }}
                                size="giant"
                                style={styles.avatar}
                            />
                        ) : (
                            <Avatar
                                source={logo_bee_blue}
                                size="giant"
                                style={styles.avatar}
                            />
                        )}
                        <View style={styles.info}>
                            <View style={styles.infoRow}>
                                <Icon
                                    style={styles.icon}
                                    fill="#3366FF"
                                    name="bookmark-outline"
                                />
                                <Text category="s1" style={styles.textT}>
                                    {userLogin?.CustomerCode}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Icon
                                    style={styles.icon}
                                    fill="#3366FF"
                                    name="person-outline"
                                />
                                <Text category="s1" style={styles.textT}>
                                    {userLogin?.CustomerName}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Icon style={styles.icon} fill="#3366FF" name="phone-outline" />
                                <Text category="s1" style={styles.textT}>
                                    Số điện thoại: {userLogin?.Phone}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>
                <View style={{ marginHorizontal: 10 }}>
                    <Button
                        onPress={handleLogout}
                        textColor={colors.WHITE}
                        bgColor={colors.SECONDARY_RED}
                        paddingVertical={5}
                    >
                        Đăng xuất
                    </Button>
                </View>

                <View style={{ margin: 10 }}>
                    <Button
                        onPress={() => setIsModalVisible(true)}
                        textColor={colors.WHITE}
                        bgColor={"#3366FF"}
                        paddingVertical={5}
                    >
                        Xóa tài khoản
                    </Button>
                </View>
                <View style={MainStyles.flexRowCenter}>
                    <Text style={MainStyles.version}>{"Version 1.0.0"}</Text>
                </View>
                <Box height={SCREEN_HEIGHT * 0.2} />
            </ScrollView>
            <ModalConfirm
                title={
                    "Bạn  có chắc chắn muốn xóa tài khoản hiện tại không ? Mọi thông tin của bạn sẽ không còn trên hệ thống sau khi bạn xác nhận !"
                }
                isModalVisible={isModalVisible}
                setModalVisible={setIsModalVisible}
                onConfirm={handleClearAccount}
                backdropClose={true}
            />
            <ModalEditUser
                isModalVisible={modalEditUser}
                setModalVisible={setModalEditUser}
                onConfirm1={() => { }}
                onConfirm2={() => { }}
            />
            <Box height={SCREEN_HEIGHT * 0.1} bgColor={colors.WHITE} />
        </LayoutGradientBlue>
    );
};

export default AccountTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    textT: {
        marginRight: 10,
        paddingLeft: 10,
        fontSize: 15,
        color: colors.MAIN_BLUE_CLIENT,
        marginVertical: 4,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: SCREEN_HEIGHT * 0.7,
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    card: {
        margin: 16,
        borderRadius: 12,
        // padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    editIcon: {
        width: 24,
        height: 24,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
});
