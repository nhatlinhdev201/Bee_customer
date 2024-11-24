import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { colors, themeColors } from "../../styles/Colors";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import CustomLabel from "../../components/forms/CustomLabel";
import { ic_coin } from "../../assets";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { dateTimeFormat, FormatMoney } from "../../Utils";
import Box from "../../components/Box";
import { Icon, Spinner } from "@ui-kitten/components";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { GenerateStatusOrder } from "../../Utils/GenerateStatusOrder";
import { ScreenNames } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
import { PropTypes } from "prop-types";
import { Header } from "../../components/HeaderComp";

const CashScreen = ({ route }) => {
  const navi = useNavigation();
  const { data } = route.params || {};

  return (
    <LayoutGradientBlue>
      {/* <BackButton color={colors.MAIN_BLUE_CLIENT} />
      <Text
        style={{
          textAlign: "center",
          color: colors.MAIN_BLUE_CLIENT,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Thông tin dịch vụ
      </Text> */}
      <Header headerTitle="Thông tin dịch vụ" backBtnVisible={true} />
      <ScrollView>
        <View
          style={[
            MainStyles.containerTabPayment,
            {
              backgroundColor: colors.WHITE,
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              marginTop: 10,
            },
          ]}
        >
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
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill={themeColors.icon}
                      name="pin-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Địa chỉ: {data?.DataService?.Address}
                    </Text>
                  </View>
                </View>
                {data?.DataService?.TotalRoom && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="share-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số phòng: {data?.DataService?.TotalRoom} phòng
                      </Text>
                    </View>
                  </View>
                )}
                {data?.DataService?.SelectOption?.length && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="share-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Loại : {data?.DataService?.SelectOption[0]?.OptionName}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <View style={MainStyles.flexRowFlexEnd}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="clock-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Làm việc trong:{" "}
                        {RoundUpNumber(data?.DataService?.TimeWorking, 0)} giờ
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill={themeColors.icon}
                      name="plus-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Dịch vụ thêm:{" "}
                      {data?.DataService?.OtherService?.length > 0
                        ? ""
                        : "không kèm dịch vụ thêm"}
                    </Text>
                  </View>
                  {data?.DataService?.OtherService?.length > 0 &&
                    data?.DataService?.OtherService.map((item) => (
                      <View
                        key={item?.ServiceDetailId?.toString()}
                        style={MainStyles.flexRowFlexStart}
                      >
                        <Icon
                          style={{
                            marginLeft: SCREEN_WIDTH * 0.07,
                            width: 20,
                            height: 20,
                          }}
                          fill={themeColors.icon}
                          name="plus-outline"
                        />
                        <Text style={[MainStyles.textCardJob]}>
                          {item?.ServiceDetailName}
                        </Text>
                      </View>
                    ))}
                </View>
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill={themeColors.icon}
                      name="message-square-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      {data?.DataService?.NoteBooking
                        ? "Ghi chú: " + data?.DataService?.NoteBooking.trim()
                        : "Không có ghi chú"}
                    </Text>
                  </View>
                </View>
                {data?.DataService?.Voucher?.length > 0 && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="pricetags-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Đã sử dụng voucher:
                      </Text>
                    </View>
                    {data?.DataService?.Voucher?.length > 0
                      ? data?.DataService?.Voucher.map((item) => (
                        <View
                          key={item?.VoucherId.toString()}
                          style={MainStyles.flexRowFlexStart}
                        >
                          <Icon
                            style={{
                              marginLeft: SCREEN_WIDTH * 0.07,
                              width: 20,
                              height: 20,
                            }}
                            fill={themeColors.icon}
                            name="plus-outline"
                          />
                          <Text style={[MainStyles.textCardJob]}>
                            CODE: {item?.VoucherCode} - giảm{" "}
                            {item?.TypeDiscount === 1
                              ? item?.Discount + "%"
                              : FormatMoney(item?.Discount) + " đ"}
                          </Text>
                        </View>
                      ))
                      : null}
                  </View>
                )}
                <View style={MainStyles.rowMargin}>
                  <View style={MainStyles.flexRowFlexStart}>
                    <Icon
                      style={MainStyles.CardIcon}
                      fill={themeColors.icon}
                      name="calendar-outline"
                    />
                    <Text style={MainStyles.textCardJob}>
                      Thời gian tạo: {dateTimeFormat(data?.CreateAt, 2)}
                    </Text>
                  </View>
                </View>

                <View style={MainStyles.flexRowCenter}>
                  <View style={MainStyles.line} />
                </View>
                <Text style={MainStyles.titleContentModal}>
                  Nhân viên nhận đơn
                </Text>
                {data?.DataService?.TotalStaff && (
                  <View style={MainStyles.rowMargin}>
                    <View style={MainStyles.flexRowFlexStart}>
                      <Icon
                        style={MainStyles.CardIcon}
                        fill={themeColors.icon}
                        name="people-outline"
                      />
                      <Text style={MainStyles.textCardJob}>
                        Số lượng nhân viên:{" "}
                        {data?.StaffInformation?.length || 0} nhân viên
                      </Text>
                    </View>
                  </View>
                )}
                {data?.StaffInformation?.length > 0 &&
                  data?.StaffInformation?.map((item, index) => (
                    <View style={MainStyles.cardStaff} key={index}>
                      {item?.StaffName && (
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill={themeColors.icon}
                              name="person-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              Tên nhân viên:{" "}
                              {item?.StaffName || "Không xác định"}
                            </Text>
                          </View>
                        </View>
                      )}
                      {item?.StaffPhone && (
                        <View style={MainStyles.rowMargin}>
                          <View style={MainStyles.flexRowFlexStart}>
                            <Icon
                              style={MainStyles.CardIcon}
                              fill={themeColors.icon}
                              name="phone-outline"
                            />
                            <Text style={MainStyles.textCardJob}>
                              Số điện thoại:{" "}
                              {item?.StaffPhone || "Chưa có thông tin"}
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={MainStyles.rowMargin}>
                        <View style={MainStyles.flexRowFlexStart}>
                          <Icon
                            style={MainStyles.CardIcon}
                            fill={themeColors.icon}
                            name="flash-outline"
                          />
                          <Text style={MainStyles.textCardJob}>
                            {GenerateStatusOrder(item.StatusOrder || 0)}
                          </Text>
                        </View>
                      </View>
                      {item?.StaffPhone && (
                        <View style={MainStyles.flexRowCenter}>
                          {item?.StatusOrder === 1 ||
                            item?.StatusOrder === 2 ? (
                            <TouchableOpacity
                              onPress={() => {
                                navi.navigate(ScreenNames.VIEW_STAFF, {
                                  data: {
                                    ...data,
                                    OrderId: item?.OrderId
                                  },
                                  previous: true,
                                });
                              }}
                            >
                              <View
                                style={[
                                  MainStyles.flexRowCenter,
                                  { minWidth: 80 },
                                  MainStyles.cardBtnViewLocation,
                                ]}
                              >
                                <Icon
                                  style={[
                                    MainStyles.CardIcon,
                                    { marginRight: 0 },
                                  ]}
                                  fill="#FFFFFFFF"
                                  name="navigation-2-outline"
                                />
                                {/* <Text style={MainStyles.textCardPhoneCall}>Xem vị trí</Text> */}
                              </View>
                            </TouchableOpacity>
                          ) : null}
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(`tel:${item?.StaffPhone}`);
                            }}
                          >
                            <View
                              style={[
                                MainStyles.flexRowCenter,
                                { minWidth: 80 },
                                MainStyles.cardPhoneCall,
                              ]}
                            >
                              <Icon
                                style={[
                                  MainStyles.CardIcon,
                                  { marginRight: 0 },
                                ]}
                                fill="#FFFFFFFF"
                                name="phone-outline"
                              />
                              {/* <Text style={MainStyles.textCardPhoneCall}>Gọi nhân viên</Text> */}
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ))}
              </View>
            </View>
          ) : (
            <View style={MainStyles.flexRowCenter}>
              <Spinner />
            </View>
          )}
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomLabel color={colors.WHITE}>
            {data?.DataService?.Payment
              ? "Thanh toán chuyển khoản"
              : "Thanh toán tiền mặt"}
          </CustomLabel>
        </View>
        <View
          style={[
            MainStyles.cardContentJob,
            {
              backgroundColor: colors.MAIN_BLUE_CLIENT,
              paddingVertical: 8,
              borderRadius: 10,
            },
          ]}
        >
          <View style={MainStyles.flexRowCenter}>
            <View>
              <Text
                style={{
                  color: colors.WHITE,
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
        </View>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};

CashScreen.propTypes = {
  route: PropTypes.object,
};

export default CashScreen;
