import { firebase } from "@react-native-firebase/database";

export const databaseChat = firebase
    .app()
    .database(
        "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app"
    )
    .ref("/chat");

// Hàm để lắng nghe tin nhắn trong một cuộc trò chuyện cụ thể
export const listenForMessages = (chatId, callback) => {
    const chatRef = databaseChat.child(`${chatId}/messages`);

    const onValueChange = chatRef.on('value', (snapshot) => {
        const messages = [];

        snapshot.forEach((childSnapshot) => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
            });
        });

        // Sắp xếp tin nhắn theo thời gian mới nhất
        messages.sort((a, b) => b.timestamp - a.timestamp);

        // Gọi callback với danh sách tin nhắn
        callback(messages);
    });

    // Trả về hàm hủy lắng nghe khi không cần thiết nữa
    return () => chatRef.off('value', onValueChange);
};

// Hàm để gửi tin nhắn vào một cuộc trò chuyện
export const sendMessage = async (chatId, senderId, text) => {
    const messageRef = databaseChat.child(`${chatId}/messages`).push();
    const timestamp = Date.now();

    await messageRef.set({
        senderId,
        text,
        timestamp,
    });

    console.log('Message sent successfully!');
};

// Hàm để gửi tin nhắn vào một cuộc trò chuyện
export const sendMessageLocation = async (chatId, senderId, location) => {
    const messageRef = databaseChat.child(`${chatId}/messages`).push();
    const timestamp = Date.now();

    await messageRef.set({
        senderId,
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        type: "location",
        text: "Tôi đang ở "+ location.address,
        timestamp,
    });

    console.log('Message sent successfully!');
};


// firebaseFunctions.js (Cập nhật dữ liệu mẫu)
export const createSampleData = async () => {
    // Dữ liệu cuộc trò chuyện với Alice
    const chatId1 = "789_101";
    const chatRef1 = databaseChat.child(chatId1);
    await chatRef1.set({
        participants: {
            "789": {
                name: "You",
                avatar: "https://th.bing.com/th/id/OIP.E-SUGrMWibPGBfSV2Z649AHaIi?rs=1&pid=ImgDetMain" // Avatar của bạn
            },
            "101": {
                name: "Nhật Linh",
                avatar: "https://64.media.tumblr.com/73377afe9e3ff6a65c7d1e3929b3cdbd/tumblr_ncf49l9Apb1r4n78bo1_1280.jpg" // Avatar của Alice
            }
        },
        messages: {
            message1: {
                senderId: "789",
                text: "Hello Alice!",
                timestamp: 1693935600000,
            },
            message2: {
                senderId: "101",
                text: "Hi there! How are you?",
                timestamp: 1693935660000,
            },
        },
    });

    // Dữ liệu cuộc trò chuyện với Bob
    const chatId2 = "789_102";
    const chatRef2 = databaseChat.child(chatId2);
    await chatRef2.set({
        participants: {
            "789": {
                name: "You",
                avatar: "https://th.bing.com/th/id/OIP.E-SUGrMWibPGBfSV2Z649AHaIi?rs=1&pid=ImgDetMain" 
            },
            "102": {
                name: "Sinh Nguyễn",
                avatar: "https://th.bing.com/th/id/OIP.AV08l3AmjCnQfUrBW3O3OQHaHa?rs=1&pid=ImgDetMain" 
            }
        },
        messages: {
            message1: {
                senderId: "789",
                text: "Hey Bob, what's up?",
                timestamp: 1693935720000,
            },
            message2: {
                senderId: "102",
                text: "Not much, just chilling. You?",
                timestamp: 1693935780000,
            },
        },
    });

    console.log('Sample data created successfully!');
};

// Hàm để lắng nghe danh sách cuộc trò chuyện
export const listenForChatList = (userId, callback) => {
    // Lấy tất cả các cuộc trò chuyện
    const chatListRef = databaseChat;

    // Đăng ký lắng nghe thay đổi cuộc trò chuyện
    const onValueChange = chatListRef.on('value', (snapshot) => {
        const chatList = [];

        snapshot.forEach((childSnapshot) => {
            const chatData = childSnapshot.val();
            const chatId = childSnapshot.key;

            // Kiểm tra nếu người dùng là một trong các participants
            if (chatData.participants && chatData.participants[userId]) {
                const participantId = Object.keys(chatData.participants).find(id => id !== userId);
                const participant = chatData.participants[participantId];

                // Lấy tin nhắn mới nhất
                let lastMessage = 'No messages yet';
                let timestamp = Date.now();
                if (chatData.messages) {
                    const messages = Object.values(chatData.messages);
                    if (messages.length > 0) {
                        // Sắp xếp tin nhắn theo timestamp và lấy tin nhắn mới nhất
                        messages.sort((a, b) => b.timestamp - a.timestamp);
                        lastMessage = messages[0].text;
                        timestamp = messages[0].timestamp;
                    }
                }

                // Lấy thông tin isBlock nếu có
                const isBlock = chatData.isBlock || false;

                chatList.push({
                    chatId,
                    friendName: participant.name,
                    friendAvatar: participant.avatar,
                    lastMessage,
                    timestamp,
                    isBlock,
                });
            }
        });

        // Gọi callback với danh sách cuộc trò chuyện
        callback(chatList);
    });

    // Trả về hàm hủy lắng nghe khi không cần thiết nữa
    return () => chatListRef.off('value', onValueChange);
};