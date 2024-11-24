import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createSampleData, listenForChatList } from './createSampleData';
import { ScreenNames } from '../Constants';
import HeaderChat from './HeaderChat';
import LayoutGradientBlue from '../components/layouts/LayoutGradientBlue';

const HomeChatScreen = () => {
  // createSampleData();
  const navigation = useNavigation();
  const [chatList, setChatList] = useState([]);
  const userId = '789';

  useEffect(() => {
    // Đăng ký lắng nghe danh sách chat
    const unsubscribe = listenForChatList(userId, (list) => {
      setChatList(list);
    });

    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [userId]);

  return (
    <LayoutGradientBlue>
      <HeaderChat title="Trò chuyện " isVisibleBack={false}/>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.chatId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#f0f0f0',
                marginBottom: 10,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate(ScreenNames.ChatDetailScreen, { chatId: item.chatId, participants: item.participants, chatInfo: item })}
            >
              {
                console.log(item)
              }
              <Image
                source={{ uri: item.friendAvatar }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.friendName}</Text>
                <Text numberOfLines={1}>{item.lastMessage}</Text>
              </View>
              <Text style={{ color: '#888', fontSize: 12 }}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LayoutGradientBlue>
  );
};

export default HomeChatScreen;
