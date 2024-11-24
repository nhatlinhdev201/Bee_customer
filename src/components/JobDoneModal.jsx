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
import { FormatMoney, FormatTime, parseTimeBE, parseTimeSql } from "../Utils";
import LayoutBottom from "./layouts/LayoutBottom";

const { height: windowHeight } = Dimensions.get("window");

const JobDoneModal = forwardRef((_, ref) => {
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
          <View style={styles.modalContent}>
            {data ? (
              <View>
                <View style={MainStyles.cardJob}>
                  <View style={MainStyles.flexRowCenter}>
                    <Text
                      style={[MainStyles.titleCardJob, { textAlign: "center" }]}
                    >
                      Dịch vụ {data?.ServiceName?.toLowerCase()}
                    </Text>
                  </View>
                  {data?.BookingServiceCode && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        color: colors.primary[700],
                        fontWeight: "bold",
                      }}
                    >
                      {data?.BookingServiceCode}
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
                          {data?.TotalStaff} Nhân viên
                        </Text>
                      </View>
                      {data?.TotalRoom && (
                        <View style={MainStyles.flexRowFlexStart}>
                          <Image
                            source={ic_living_room}
                            style={{ width: 22, height: 22 }}
                          />
                          <Text style={MainStyles.textCardJob}>
                            {data?.TotalRoom} Phòng
                          </Text>
                        </View>
                      )}
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
                          trong {data?.TimeWorking} giờ
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
                  {data?.IsPremium ? (
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
                        {data?.Detail?.length > 0
                          ? ""
                          : "Không kèm dịch vụ thêm"}
                      </Text>
                    </View>
                    {data?.Detail?.length > 0 &&
                      data?.Detail.map((item) => (
                        <View key={item?.ServiceDetailName}>
                          <Text
                            style={[
                              MainStyles.textCardJob,
                              { paddingLeft: 10 },
                            ]}
                          >
                            🔸{item.ServiceDetailName}
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
                        Địa chỉ: {data?.Address}
                      </Text>
                    </View>
                  </View>
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Image
                        source={ic_note}
                        style={{ width: 22, height: 22 }}
                      />
                      <Text style={MainStyles.textCardJob}>
                        {data?.NoteBooking
                          ? "Ghi chú: " + data?.NoteBooking.trim()
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
                        Thời gian tạo :{parseTimeBE(data?.BookingTime, 1)}
                      </Text>
                    </View>
                  </View>
                  {data?.Rating ? (
                    <View style={MainStyles.flexRowSpaceBetween}>
                      <Text style={MainStyles.textCardJob}>Đã đánh giá :</Text>
                      <Rating rating={data?.Rating} fontSize={[25, 25]} />
                    </View>
                  ) : null}
                  {data?.RatingNote ? (
                    <View style={MainStyles.flexRowSpaceBetween}>
                      <Text style={MainStyles.textCardJob}>
                        Nội dung : {data?.RatingNote}
                      </Text>
                    </View>
                  ) : null}
                  <View style={MainStyles.flexRowCenter}>
                    <View style={MainStyles.line} />
                  </View>
                </View>
                <Box height={SCREEN_HEIGHT * 0.2} />
              </View>
            ) : (
              <View style={MainStyles.flexRowCenter}>
                <Spinner />
              </View>
            )}
          </View>
        </ScrollView>
        <LayoutBottom>
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
                {FormatMoney(data?.TotalMoney)} VND
              </Text>
            </View>
          </View>
        </LayoutBottom>
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

export default JobDoneModal;
