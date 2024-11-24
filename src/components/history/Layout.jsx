import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import MainStyles from "../../styles/MainStyle";
import {
  ic_clearning,
  ic_clearning_basic,
  ic_glass,
  ic_living_room,
  ic_location,
  ic_note,
  ic_person,
  ic_schedule,
} from "../../assets";
import { parseTimeSql, units } from "../../Utils";
import Rating from "../Rating";
import { colors } from "../../styles/Colors";

const openModal = () => {
  modalRef.current?.openModal(data);
};
const layoutComp = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <ScrollView style={{ height: units.height("10%") }}>
        <View>
          <Pressable>
            <View style={MainStyles.cardJob}>
              <View style={MainStyles.flexRowCenter}>
                <Text
                  style={[MainStyles.titleCardJob, { textAlign: "center" }]}
                >
                  Dịch vụ {item?.ServiceName}
                </Text>
              </View>
              {item?.BookingServiceCode ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: colors.primary[700],
                    fontWeight: "bold",
                  }}
                >
                  {item?.BookingServiceCode}
                </Text>
              ) : null}
              <View style={MainStyles.flexRowCenter}>
                <View style={MainStyles.line} />
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowSpaceBetween}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_person}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      {item?.TotalStaff} nhân viên
                    </Text>
                  </View>
                  {item?.TotalRoom ? (
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_living_room}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {item?.TotalRoom} phòng
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowSpaceBetween}>
                  <View style={MainStyles.flexRowFlexEnd}>
                    <Image
                      source={ic_glass}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      {" "}
                      trong {item?.TimeWorking || 1} giờ
                    </Text>
                  </View>
                </View>
              </View>
              {item?.DataService?.IsPremium ? (
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={cirtificate}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>Dịch vụ Premium</Text>
                  </View>
                </View>
              ) : (
                <View View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_clearning_basic}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thông thường
                    </Text>
                  </View>
                </View>
              )}
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_location}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>
                    Địa chỉ:{" "}
                    {item?.DataService?.Address || "Chưa cập nhật địa chỉ"}
                  </Text>
                </View>
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_clearning}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>
                    Dịch vụ thêm :{" "}
                    {item?.Detail?.length > 0 ? "" : "Không kèm dịch vụ thêm"}
                  </Text>
                </View>
                {item?.Detail?.length > 0
                  ? item?.Detail.map((item) => (
                      <View key={item.ServiceDetailId.toString()}>
                        <Text
                          style={[MainStyles.textCardJob, { paddingLeft: 10 }]}
                        >
                          🔸{item.ServiceDetailName}
                        </Text>
                      </View>
                    ))
                  : null}
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image source={ic_note} style={{ width: 22, height: 22 }} />
                  <Text style={MainStyles.textCardJob}>
                    {item?.Note
                      ? "Ghi chú: " + item?.DataService?.NoteBooking.trim()
                      : "Không có ghi chú"}
                  </Text>
                </View>
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Image
                    source={ic_schedule}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={MainStyles.textCardJob}>
                    Ngày hoàn thành : {parseTimeSql(item?.BookingTime, 1)}
                  </Text>
                </View>
              </View>
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Text style={MainStyles.textCardJob}>Được đánh giá : </Text>
                  <Rating rating={4} />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
      />
    </View>
  );
};

export const LayoutComponent = React.memo(layoutComp);

const styles = StyleSheet.create({
  container: {
    //flex: 1, // Đây là phần quan trọng để đảm bảo FlatList có thể lướt
  },
});
