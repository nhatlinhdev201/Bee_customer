import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { colors } from "../styles/Colors";
import { Spinner } from "@ui-kitten/components";
import {
  ic_person,
  ic_living_room,
  ic_glass,
  ic_chronometer,
  cirtificate,
  ic_clearning_basic,
  ic_clearning,
  ic_location,
  ic_note,
  ic_schedule,
  ic_human,
  ic_phone_call,
  ic_coin,
} from "../assets";
import Box from "./Box";
import {
  dateTimeFormat,
  FormatMoney,
  FormatTime,
  parseTimeSql,
} from "../Utils";

const { height: windowHeight } = Dimensions.get("window");

const JobDetailsModal = forwardRef((_, ref) => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal(data) {
      setData(data);
      setIsOpen(true);
    },
    closeModal() {
      setIsOpen(false);
    },
  }));

  const checkStatus = (status) => {
    if (status === 0) {
      return { status: "Chưa có nhân viên nhận đơn" };
    } else if (status === 1) {
      return { status: "Nhân viên đã nhận đơn" };
    } else if (status === 2) {
      return { status: "Nhân viên đang tới" };
    } else if (status === 3) {
      return { status: "Đang làm việc" };
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      onSwipeComplete={() => setIsOpen(false)}
      swipeDirection={["down"]}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.handle} />
        <ScrollView>
          {data ? (
            <View>
              <View style={MainStyles.cardJob}>
                <View style={MainStyles.flexRowCenter}>
                  <Text
                    style={[MainStyles.titleCardJob, { textAlign: "center" }]}
                  >
                    Dịch vụ {data?.DataService?.ServiceName.toLowerCase()}
                  </Text>
                </View>
                {data?.BookingCode && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: colors.primary[700],
                      fontWeight: "bold",
                    }}
                  >
                    {data?.BookingCode}
                  </Text>
                )}
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Thông tin dịch vụ
                </Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_person}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {data?.DataService?.TotalStaff} Nhân viên
                      </Text>
                    </View>
                    {data?.DataService?.RoomTotal && (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Image
                          source={ic_living_room}
                          style={{ width: 22, height: 22 }}
                        />
                        <Text style={MainStyles.textCardJob}>
                          {data?.DataService?.RoomTotal} Phòng
                        </Text>
                      </View>
                    )}
                    {data?.DataService?.SelectOption?.length ? (
                      <View style={MainStyles.flexRowFlexStart}>
                        <Text style={MainStyles.textCardJob}>
                          ⚙️ {data?.DataService?.SelectOption[0]?.OptionName}
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
                        Trong {data?.DataService?.TimeWorking} giờ
                      </Text>
                    </View>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Image
                        source={ic_chronometer}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>Làm ngay</Text>
                    </View>
                  </View>
                </View>
                {data?.DataService?.IsPremium ? (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={cirtificate}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        Dịch vụ Premium
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={MainStyles.rowMargin}>
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
                      source={ic_clearning}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm :{" "}
                      {data?.DataService?.OtherService?.length > 0
                        ? ""
                        : "Không kèm dịch vụ thêm"}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0 &&
                    data?.DataService?.OtherService.map((item) => (
                      <View key={item?.ServiceDetailId?.toString()}>
                        <Text
                          style={[MainStyles.textCardJob, { paddingLeft: 10 }]}
                        >
                          🔸{item?.ServiceDetailName}
                        </Text>
                      </View>
                    ))}
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_location}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Địa chỉ: {data?.DataService?.Address}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image source={ic_note} style={{ width: 22, height: 22 }} />
                    <Text style={MainStyles.textCardJob}>
                      {data?.DataService?.NoteBooking
                        ? "Ghi chú: " + data?.DataService?.NoteBooking?.trim()
                        : "Không có ghi chú"}
                    </Text>
                  </View>
                </View>
                {data?.DataService?.Voucher?.length > 0 ? (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Text style={MainStyles.textCardJob}>
                        🎁 Đã áp mã voucher :
                      </Text>
                    </View>
                    {data?.DataService?.Voucher?.length > 0
                      ? data?.DataService?.Voucher.map((item) => (
                          <View key={item?.VoucherId.toString()}>
                            <Text
                              style={[
                                MainStyles.textCardJob,
                                { paddingLeft: 10 },
                              ]}
                            >
                              🔸CODE : {item?.VoucherCode} - giảm{" "}
                              {item?.TypeDiscount === 1
                                ? item?.Discount + "%"
                                : FormatMoney(item?.Discount) + " VND"}
                            </Text>
                          </View>
                        ))
                      : null}
                  </View>
                ) : null}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_schedule}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Thời gian tạo: {parseTimeSql(data?.CreateAt, 1)}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Nhân viên nhận đơn
                </Text>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_human}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Tên nhân viên :{" "}
                      {data?.StaffName || "Chưa có nhân viên nhận đơn"}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_phone_call}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Số điện thoại : {data?.StaffPhone || "Chưa có thông tin"}
                    </Text>
                  </View>
                </View>
                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Image
                      source={ic_human}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text style={MainStyles.textCardJob}>
                      Trạng thái : {checkStatus(data?.StatusOrder).status}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    MainStyles.cardContentJob,
                    { backgroundColor: colors.primary[100], borderRadius: 10 },
                  ]}
                >
                  <Text
                    style={{
                      color: colors.MAIN_BLUE_CLIENT,
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Tổng tiền
                  </Text>
                  <View style={MainStyles.flexRowCenter}>
                    <Image source={ic_coin} style={{ width: 22, height: 22 }} />
                    <Text
                      style={{
                        color: colors.MAIN_COLOR_CLIENT,
                        marginLeft: 10,
                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {FormatMoney(data?.DataService?.PriceAfterDiscount)} VND
                    </Text>
                  </View>
                </View>
              </View>
              <Box height={SCREEN_HEIGHT * 0.2} />
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: windowHeight * 0.85, // Set max height to 85% of screen height
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.MAIN_BLUE_CLIENT,
    fontWeight: "bold",
  },
  sectionSubTitle: {
    color: colors.MAIN_BLUE_CLIENT,
  },
  additionalFields: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    backgroundColor: colors.MAIN_COLOR_CLIENT,
    color: colors.WHITE,
    padding: 5,
    borderRadius: 5,
  },
});

export default JobDetailsModal;
