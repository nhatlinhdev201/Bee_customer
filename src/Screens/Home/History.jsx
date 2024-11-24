import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { colors, themeColors } from "../../styles/Colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../styles/MainStyle";
import TabPending from "../../components/TabPending";
import TabHistory from "../../components/TabHistory";
import { useSelector } from "react-redux";
import { OVG_SnapshotDataByCustomerId } from "../../firebaseService/ListenOrder";
import { useFocusEffect } from "@react-navigation/native";
import { Header } from "../../components/HeaderComp";
import { prints } from "../../Utils";

const History = () => {
  const [selectedTab, setSelectedTab] = useState("Dịch vụ đang làm");
  const modalRef = useRef(null);
  const userLogin = useSelector((state) => state.main.userLogin);
  const modalJobDoneRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getFirstData();
      const intervalId = setInterval(() => {
        OVG_SnapshotDataByCustomerId(userLogin?.Id, setOrders);
      }, 4000); 
  
      return () => {
        clearInterval(intervalId);
      };
    }, [userLogin?.Id])
  );

  const getFirstData = async () => {
    try {
      setLoadingPending(true);
      const result = await OVG_SnapshotDataByCustomerId(userLogin?.Id, setOrders);
      if (result) {
        setLoadingPending(false);
      }
      setLoadingPending(false);
    } catch (error) {}
  } 

  const renderContent = () => {
    if (selectedTab === "Dịch vụ đang làm") {
      return <TabPending modalRef={modalRef} dataPending={orders} loadingPending={loadingPending} />;
    } else if (selectedTab === "Dịch vụ đã đặt") {
      return <TabHistory modalRef={modalJobDoneRef} />;
    }
  };
  return (
    <LayoutGradientBlue>
      <Header headerTitle="Hoạt động " backBtnVisible={false} />

      <View style={{ height: SCREEN_HEIGHT * 0.8, width: SCREEN_WIDTH }}>
        <View style={styles.container}>
          <View style={styles.tabHeader}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "Dịch vụ đang làm" && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab("Dịch vụ đang làm")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "Dịch vụ đang làm" &&
                  styles.selectedTabButtonText,
                ]}
              >
                Dịch vụ đang làm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "Dịch vụ đã đặt" && styles.selectedTabButton,
              ]}
              onPress={() => setSelectedTab("Dịch vụ đã đặt")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === "Dịch vụ đã đặt" &&
                  styles.selectedTabButtonText,
                ]}
              >
                Dịch vụ đã đặt
              </Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </View>
      </View>
    </LayoutGradientBlue>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // paddingHorizontal: 10,
  },
  tabHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabButton: {
    paddingVertical: 10,
    // paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedTabButton: {
    borderBottomColor: themeColors.textMain,
    borderRadius: 5,
    width: "40%",
  },
  tabButtonText: {
    color: themeColors.textBlack,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  selectedTabButtonText: {
    fontWeight: "bold",
    color: colors.MAIN_BLUE_CLIENT,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default History;
