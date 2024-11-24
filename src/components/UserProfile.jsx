import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { avt_default, bg_bg2, logo_bee_blue } from '../assets';
import { APIImage } from '../Config/Api';
import { Icon } from "@ui-kitten/components";
import { useSelector } from 'react-redux';
import { themeColors } from '../styles/Colors';

const UserProfileComp = ({ setModalEditUser = () => { } }) => {
    const userLogin = useSelector((state) => state.main.userLogin);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={bg_bg2}
                    style={styles.backgroundImage}
                />
                <View style={styles.avatarContainer}>
                    <Image
                        source={userLogin?.Avatar ? { uri: APIImage + userLogin.Avatar } : avt_default}
                        style={styles.avatar}
                    />
                </View>
                {/* <TouchableOpacity style={styles.editButton} onPress={() => setModalEditUser(true)}>
                    <Icon name="edit" fill={themeColors.textWhite} style={styles.editIcon} />
                </TouchableOpacity> */}
                <View></View>
            </View>

            <View style={styles.infoContainer}>
                <InfoRow icon="bookmark-outline" title="ID: " content={userLogin?.CustomerCode} />
                <InfoRow icon="person-outline" title="Họ tên: " content={userLogin?.CustomerName} />
                <InfoRow icon="phone-outline" title="Số điện thoại: " content={userLogin?.Phone} />
            </View>
        </View>
    );
};

const InfoRow = ({ icon, title, content }) => (
    <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={styles.infoRow}>
            <Icon style={styles.icon} fill={themeColors.textMain} name={icon} />
            <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content}>{content || 'N/A'}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.lightBackground,
    },
    header: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover',
    },
    avatarContainer: {
        position: 'absolute',
        bottom: -50,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    editButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: themeColors.confirm,
        borderRadius: 20,
        padding: 5,
    },
    editIcon: {
        width: 25,
        height: 25,
    },
    infoContainer: {
        marginTop: 60, // Tăng khoảng cách cho thông tin
        padding: 15,
        backgroundColor: '#fff', // Nền trắng cho phần thông tin
        borderRadius: 10,
        elevation: 3, // Đổ bóng cho phần thông tin
        marginHorizontal: 10, // Khoảng cách bên trái và phải
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 15, // Khoảng cách giữa các hàng
    },
    icon: {
        marginRight: 15,
        width: 24,
        height: 24,
    },
    infoContent: {
        flexDirection: 'column',
        flex: 1, // Cho phép nội dung chiếm toàn bộ chiều rộng
    },
    title: {
        fontWeight: 'bold',
        color: themeColors.textMain,
        fontSize: 16,
        minWidth: 120,
    },
    content: {
        color: themeColors.textMain,
        fontSize: 14,
    },
});

export const UserProfile = memo(UserProfileComp);
