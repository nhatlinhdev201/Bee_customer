import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, Alert, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { listenForMessages, sendMessage, sendMessageLocation } from './createSampleData';
import HeaderChat from './HeaderChat';
import LayoutGradientBlue from '../components/layouts/LayoutGradientBlue';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '@ui-kitten/components';
import { APIImage } from '../Config/Api';
import Geolocation from '@react-native-community/geolocation';
import GetLocationTitle from '../Utils/GetLocationTitle';
import { mainAction } from '../Redux/Action';
import { im_map } from '../assets';
import { colors } from '../styles/Colors';
import { openGoogleMapsApp, openGoogleMapsDirections, openGoogleMapsWithLocation } from '../Utils/GoogleMapHandle';

const ChatDetailScreen = () => {
    const route = useRoute();
    const userLogin = useSelector((state) => state.main.userLogin);
    const { chatId, chatInfo } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const userId = '789';
    const defaultUserAvatar = APIImage + userLogin?.Avatar || "https://th.bing.com/th/id/OIP.E-SUGrMWibPGBfSV2Z649AHaIi?rs=1&pid=ImgDetMain";
    const defaultFriendAvatar = chatInfo?.friendAvatar || "https://th.bing.com/th/id/OIP.E-SUGrMWibPGBfSV2Z649AHaIi?rs=1&pid=ImgDetMain";
    const [isBlock, setIsBlock] = useState(chatInfo?.isBlock || false);
    const dispatch = useDispatch();
    const locationTime = useSelector((state) => state.main.locationTime);

    useEffect(() => {
        updateLocation();
    }, []);


    const SendIcon = (props) => (
        <Icon {...props} name="paper-plane-outline" />
    );
    const SendIconLocation = (props) => (
        <Icon {...props} name="pin" fill="#f00" />
    );
    useEffect(() => {
        // Đăng ký lắng nghe tin nhắn của cuộc trò chuyện
        const unsubscribe = listenForMessages(chatId, setMessages);

        // Hủy đăng ký lắng nghe khi component bị unmount
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [chatId]);

    const updateLocation = async () => {
        try {
            Geolocation.getCurrentPosition(
                async (position) => {
                    if (position?.coords) {
                        const result = await GetLocationTitle(
                            position?.coords?.latitude,
                            position?.coords?.longitude
                        );
                        mainAction.locationUpdate(result, dispatch);
                    }
                },
                (error) => {
                },
                { enableHighAccuracy: false, timeout: 20000 }
            );
        } catch (e) { }
    };
    const handleSendLocation = async () => {

        if (!locationTime) {
            Alert.alert("Can't get location", `Please check your location setting`);

            return;
        };

        await sendMessageLocation(chatId, userId, locationTime);
        setMessageText('');
    }

    const handleSendMessage = async () => {
        if (messageText.trim() === '') return;

        await sendMessage(chatId, userId, messageText);
        setMessageText('');
    };

    return (
        <LayoutGradientBlue>
            <HeaderChat title={chatInfo?.friendName} isVisibleInfo={true} userInfo={chatInfo} isBlock={isBlock} setIsBlock={setIsBlock} />
            <View style={{ flex: 1, padding: 20 }}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    inverted
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10, alignItems: item.senderId === userId ? 'flex-end' : 'flex-start' }}>
                            <View style={[
                                styles.messageBubble,
                                { backgroundColor: item.senderId === userId ? '#DCF8C6' : '#FFF' }
                            ]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: item.senderId === userId ? defaultUserAvatar : defaultFriendAvatar }}
                                        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                                    />
                                    <View>
                                        <Text>{item.text}</Text>
                                        {item.timestamp && (
                                            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
                                        )}
                                    </View>
                                </View>
                                {item?.type === "location" && (
                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={im_map}
                                                style={{ width: 250, height: 100, borderRadius: 15, marginRight: 10 }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    openGoogleMapsApp(item.latitude, item.longitude);
                                                }}
                                                style={{ margin: 10, backgroundColor: colors.WHITE, padding: 10, borderRadius: 5, borderColor: colors.MAIN_BLUE_CLIENT, borderWidth: 1 }}
                                            >
                                                <Text>Xem vị trí</Text>
                                            </TouchableOpacity>
                                            {
                                                item.senderId !== userId && (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            openGoogleMapsDirections(item.latitude, item.longitude, locationTime?.latitude, locationTime?.longitude);
                                                        }}
                                                        style={{ margin: 10, backgroundColor: colors.WHITE, padding: 10, borderRadius: 5, borderColor: colors.MAIN_BLUE_CLIENT, borderWidth: 1 }}
                                                    >
                                                        <Text>Xem đường đi</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    )}
                />
                {
                    isBlock ? (
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Đã chặn tin nhắn</Text>
                    ) : (
                        <View style={styles.inputContainer}>
                            <Button
                                title="Send Location"
                                style={{ backgroundColor: 'none', borderColor: '#ffffff', marginRight: 10 }}
                                accessoryRight={SendIconLocation}
                                appearance='ghost'
                                onPress={handleSendLocation} />
                            <TextInput
                                style={styles.input}
                                value={messageText}
                                onChangeText={setMessageText}
                                placeholder="Nhập tin nhắn..."
                            />
                            <Button
                                title="Send"
                                accessoryRight={SendIcon}
                                onPress={handleSendMessage} />
                        </View>
                    )
                }
            </View>
        </LayoutGradientBlue>
    );
};

const styles = StyleSheet.create({
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
});

export default ChatDetailScreen;