import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "@ui-kitten/components"; // import Card from UI Kitten
import { Dimensions } from "react-native";
import { ic_location } from "../assets";
import MainStyles from "../styles/MainStyle";
import { colors } from "../styles/Colors";
import Person from "./svg/Person";
import Label from "./Label";
import HourGlass from "./svg/HourGlass";
import GroupPerson from "./svg/GroupPerson";
import { FormatMoney } from "../Utils";
import Box from "./Box";
import Money from "./svg/Money";

const SCREEN_WIDTH = Dimensions.get("window").width;

const BookingCard = ({ data, onPress }) => {
  const renderOtherServices = () => {
    return data.otherService.map((service, index) => (
      <View key={index} style={styles.serviceDetail}>
        <Text style={styles.note}>{service.ServiceDetailName}</Text>
      </View>
    ));
  };

  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.serviceName}>{data.ServiceName}</Text>
        </View>
        <Label>Địa chỉ :</Label>
        <View style={[styles.cardHeader, MainStyles.flexRowFlexStart]}>
          <Image source={ic_location} style={styles.icon} />
          <Text style={styles.address}>{data.Address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Person color={colors.MAIN_COLOR_CLIENT} />
            <Text style={styles.infoText}>{data.CustomerName}</Text>
          </View>
          <View style={styles.infoItem}>
            <HourGlass color={colors.MAIN_COLOR_CLIENT} />
            <Text style={styles.infoText}>{data.workingTime} giờ</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            {/* <Image source={ic_coin} style={styles.icon} /> */}
            <Money color={colors.MAIN_COLOR_CLIENT} />
            <Text style={styles.infoText}>
              {FormatMoney(data.TotalPrice)} VND
            </Text>
          </View>
          <View style={styles.infoItem}>
            <GroupPerson color={colors.MAIN_COLOR_CLIENT} />
            <Text style={styles.infoText}>{data.people} người</Text>
          </View>
        </View>
        {data.otherService.length > 0 && (
          <View style={styles.serviceContainer}>
            <Box height={SCREEN_WIDTH * 0.01} />
            <Label>Dịch vụ khác :</Label>
            {renderOtherServices()}
          </View>
        )}
        <View style={MainStyles.flexRowFlexStart}>
          <Label>Ghi chú : </Label>
          <Text style={styles.note}>{data.note}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    paddingRight: 10,
    marginBottom: 10,
  },
  cardHeader: {
    marginBottom: 10,
  },
  serviceName: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: SCREEN_WIDTH * 0.05,
  },
  address: {
    marginBottom: 10,
    marginLeft: 5,
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 5,
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 16,
    fontWeight: "600",
  },
  note: {
    color: colors.MAIN_BLUE_CLIENT,
    fontSize: 14,
  },
  icon: {
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_WIDTH * 0.07,
  },
});

export default BookingCard;
