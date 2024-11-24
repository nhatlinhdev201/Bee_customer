import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { colors, themeColors } from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { SCREEN_WIDTH } from '../styles/MainStyle';
import { firebase } from '@react-native-firebase/database';

const HeaderChat = ({ title = "", onBackPress = () => { }, isVisibleBack = true, isVisibleInfo = false, userInfo = {}, isBlock = false, setIsBlock = () => {} }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);

    const handleBackPress = () => {
        onBackPress();
        navigation.goBack();
    };

    const handleCheckInfo = () => {
        setModalVisible(true);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleReport = () => {
        // Xử lý báo cáo
        // toggleModal(); // Đóng modal
        setModalVisible(false);
        setIsReportModalVisible(true);
        console.log("Báo cáo người dùng");
    };

    const handleReportReasonPress = (reason) => {
        Alert.alert("Báo cáo thành công", `Bạn đã báo cáo: ${reason}`);
        setIsReportModalVisible(false);
    };

    const handleBlockPress = () => {
        firebase
            .app()
            .database(
                "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
            )
            .ref(`/chat/${userInfo?.chatId}`)
            .update({
                isBlock: !isBlock,
            })
            .then(() => {
                setIsBlock(!isBlock);
                // Alert.alert("Người dùng đã bị chặn.");
                setModalVisible(false); // Đóng modal thông tin
            })
            .catch((error) => {
                console.error("Cập nhật isBlock thất bại: ", error);
            });
    };

    return (
        <View>
            <View style={styles.headerContainer}>
                {
                    isVisibleBack ? (
                        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                            <Icon name='arrow-back' width={24} height={24} fill='#fff' />
                        </TouchableOpacity>
                    ) : null
                }
                <Text style={styles.title}>{title}</Text>
                {
                    isVisibleInfo ? (
                        <TouchableOpacity onPress={handleCheckInfo} style={styles.backButton}>
                            <Icon name='info-outline' width={24} height={24} fill='#fff' />
                        </TouchableOpacity>
                    ) : null
                }
            </View>

            {/* Modal hiển thị thông tin */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Image
                        source={{ uri: userInfo.friendAvatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.modalTitle}>{userInfo.friendName}</Text>

                    <TouchableOpacity onPress={handleReport} style={[styles.modalButton, { backgroundColor: themeColors.confirm }]}>
                        <Text style={styles.buttonText}>Report</Text>
                    </TouchableOpacity>
                    {
                        isBlock ? (
                            <TouchableOpacity onPress={handleBlockPress} style={[styles.modalButton, { backgroundColor: themeColors.cancel }]}>
                                <Text style={styles.buttonText}>Unblock</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleBlockPress} style={[styles.modalButton, { backgroundColor: themeColors.cancel }]}>
                                <Text style={styles.buttonText}>Block</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </Modal>

            {/* Modal hiển thị danh sách lý do báo cáo */}
            <Modal isVisible={isReportModalVisible} onBackdropPress={() => setIsReportModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={[styles.modalTitle, { marginBottom: 20, textAlign: 'center', color: themeColors.primary }]}>Lý do báo cáo</Text>
                    <TouchableOpacity onPress={() => handleReportReasonPress('Spam')}>
                        <Text style={styles.reasonText}>Spam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReportReasonPress('Lừa đảo')}>
                        <Text style={styles.reasonText}>Lừa đảo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReportReasonPress('Ngôn từ thô tục')}>
                        <Text style={styles.reasonText}>Ngôn từ thô tục</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReportReasonPress('Nội dung không phù hợp')}>
                        <Text style={styles.reasonText}>Nội dung không phù hợp</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: themeColors.header,
        elevation: 4,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        minWidth: SCREEN_WIDTH * 0.6,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    reportButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    blockButton: {
        backgroundColor: 'grey',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    reasonText: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HeaderChat;
