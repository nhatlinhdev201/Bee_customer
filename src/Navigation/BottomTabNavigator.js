import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@ui-kitten/components";
import History from "../Screens/Home/History";
import HomeScreen from "../Screens/Home/HomeScreen";
import Welfare from "../Screens/Home/Welfare";
import Account from "../Screens/Home/Account";
import { News } from "../Screens/Home";
import { ScreenNames } from "../Constants";
import { themeColors } from "../styles/Colors";
import { Badge } from "./Badge";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const notificationCount = useSelector((state) => state.main.acceptedOrder);
  
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{
        tabBarActiveTintColor: themeColors.main,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: themeColors.lightBackground,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          left: 0,
          right: 0,
          bottom: 0,
        }
      }}
    >
      <Tab.Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" fill={color} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.NEWS_SCREEN}
        component={News}
        options={{
          tabBarLabel: "Tin tức",
          tabBarIcon: ({ color }) => (
            <Icon name="tv-outline" fill={color} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.HISTORY}
        component={History}
        options={{
          tabBarLabel: "Hoạt động",
          tabBarIcon: ({ color }) => (
            <View style={{ position: 'relative' }}>
              <Icon name="clipboard-outline" fill={color} style={styles.icon} />
              <Badge count={notificationCount} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.WELFARE}
        component={Welfare}
        options={{
          tabBarLabel: "Phúc lợi",
          tabBarIcon: ({ color }) => (
            <Icon name="gift-outline" fill={color} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ACCOUNT}
        component={Account}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" fill={color} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  }
});
