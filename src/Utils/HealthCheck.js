import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import BlockModal from "../components/modal/BlockModal";

const HealthCheck = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Initial check for internet connection
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          setIsConnected(false);
          setModalMessage(
            "Kết nối internet không ổn định, vui lòng kiểm tra lại kết nối wifi hoặc mạng di động trên thiết bị !"
          );
          setModalVisible(true);
        }
      });

      const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
        if (!state.isConnected) {
          setIsConnected(false);
          setModalMessage(
            "Kết nối internet không ổn định, vui lòng kiểm tra lại kết nối wifi hoặc mạng di động trên thiết bị !"
          );
          setModalVisible(true);
        } else {
          setIsConnected(true);
          setModalVisible(false);
        }
      });

      return () => {
        unsubscribeNetInfo();
      };
    }, 5000); // Start after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <BlockModal
      title={modalMessage}
      isModalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onRetry={() => {}}
      isCheckInternet={true}
    />
  );
};

export default HealthCheck;
