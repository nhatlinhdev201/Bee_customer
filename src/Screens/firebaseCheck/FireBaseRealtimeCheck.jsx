// FireBaseRealtimeCheck.jsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import {
  placeOrder,
  listenForOrderUpdates,
  listenForNewOrders,
  acceptOrder,
  checkAndDeleteExpiredOrders,
  listenForAcceptedOrders,
  completeOrder,
} from "../../firebaseService/HandleOrder";
import { clientId, orderId, staffId } from "../data";

const FireBaseRealtimeCheck = () => {
  const [clientOrder, setClientOrder] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    listenForOrderUpdates(clientId, setClientOrder);
    listenForNewOrders(setNewOrders);
    listenForAcceptedOrders(staffId, setAcceptedOrders);
    checkAndDeleteExpiredOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.halfScreen}>
        <Text style={styles.header}>Nhân viên</Text>
        {newOrders.length > 0 ? (
          newOrders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <Text>Order ID: {order.OrderId}</Text>
              <Text>Client ID: {order.ClientId}</Text>
              <Button
                title="Nhận đơn"
                onPress={() => acceptOrder(order.OrderId, staffId)}
              />
            </View>
          ))
        ) : (
          <Text>Không có đơn hàng mới</Text>
        )}
        <Text style={styles.subHeader}>Đơn hàng đã nhận</Text>
        {acceptedOrders.length > 0 ? (
          acceptedOrders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <Text>Order ID: {order.OrderId}</Text>
              <Text>Client ID: {order.ClientId}</Text>
              <Button
                title="Hoàn thành đơn"
                onPress={() => completeOrder(order.OrderId)}
              />
            </View>
          ))
        ) : (
          <Text>Không có đơn hàng đã nhận</Text>
        )}
      </View>
      <View style={styles.halfScreen}>
        <Text style={styles.header}>Khách hàng</Text>
        <Button title="Đặt đơn" onPress={() => placeOrder(clientId, orderId)} />
        {clientOrder ? (
          <View style={styles.orderContainer}>
            <Text>Order ID: {clientOrder.OrderId}</Text>
            <Text>
              Trạng thái:{" "}
              {clientOrder.StaffId === ""
                ? "Đang đợi nhân viên nhận đơn"
                : `Đã nhận bởi nhân viên ID: ${clientOrder.StaffId}`}
            </Text>
          </View>
        ) : (
          <Text>Không có đơn hàng</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  halfScreen: {
    flex: 1,
    marginBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  orderContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default FireBaseRealtimeCheck;
