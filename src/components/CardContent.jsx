import React from "react";
import { Image, View } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { colors, themeColors } from "../styles/Colors";
import MainStyles, { SCREEN_WIDTH } from "../styles/MainStyle";
import { dateTimeFormat, FormatDate, FormatMoney } from "../Utils";
import { RoundUpNumber } from "../Utils/RoundUpNumber";
import { coin_icon, ic_coin } from "../assets";
import Rating from "./Rating";

const CardContent = ({
  ServiceName = "",
  BookingCode = "",
  StaffTotal = 0,
  TotalRoom = 0,
  OptionName = "",
  TimeWorking = "",
  OtherService = [],
  Voucher = [],
  NoteBooking = "",
  CreateAtFirebase = "",
  CreateAtDatabse = "",
  Address = "",
  TotalMoney = 0,
  PriceAfterDiscount = 0,
  RatingNote = "",
  Star = 0,
}) => {

  return (
    <>
      <View style={MainStyles.flexRowCenter}>
        <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
          Dịch vụ {ServiceName.toLowerCase()}
        </Text>
      </View>
      {
        BookingCode ? (
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: colors.primary[700],
              fontWeight: "bold",
            }}
          >
            {BookingCode}
          </Text>
        ) : null
      }
      <View style={MainStyles.flexRowCenter}>
        <View style={MainStyles.line} />
      </View>
      {
        StaffTotal !== 0 && (
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill={themeColors.icon}
                name="people-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Số lượng nhân viên: {StaffTotal || 0} nhân
                viên
              </Text>
            </View>
          </View>
        )
      }

      {TotalRoom !== 0 && (
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="share-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Số phòng: {TotalRoom} phòng
            </Text>
          </View>
        </View>
      )}
      {OptionName !== "" && (
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="share-outline"
            />
            <Text style={MainStyles.textCardJob}>
              Loại: {OptionName}
            </Text>
          </View>
        </View>
      )}
      {
        TimeWorking && (
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <View style={MainStyles.flexRowFlexEnd}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="clock-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  {" "}
                  Làm việc trong:{" "}
                  {RoundUpNumber(TimeWorking, 0)} giờ
                </Text>
              </View>
            </View>
          </View>
        )
      }
      <View style={MainStyles.rowMargin}>
        <View style={MainStyles.flexRowFlexStart}>
          <Icon
            style={MainStyles.CardIcon}
            fill={themeColors.icon}
            name="plus-square-outline"
          />
          <Text style={MainStyles.textCardJob}>
            Dịch vụ thêm:{" "}
            {OtherService?.length > 0
              ? ""
              : "Không kèm dịch vụ thêm"}
          </Text>
        </View>
        {
          OtherService?.length > 0 &&
          OtherService.map((item) => (
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
          ))
        }
      </View>
      {Voucher?.length > 0 && (
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="pricetags-outline"
            />
            <Text style={MainStyles.textCardJob}>Đã sử dụng voucher: </Text>
          </View>
          {Voucher?.length > 0
            ? Voucher.map((item) => (
              <View
                key={item?.VoucherId?.toString()}
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
                    : FormatMoney(item?.Discount) + " VND"}
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
            name="message-square-outline"
          />
          <Text style={MainStyles.textCardJob}>
            {NoteBooking
              ? "Ghi chú: " + NoteBooking.trim()
              : "Không có ghi chú"}
          </Text>
        </View>
      </View>
      {RatingNote && (
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="star-outline"
            />
            <Text style={MainStyles.textCardJob}>Được đánh giá: </Text>
            <Rating rating={Star || 5} />
          </View>
        </View>
      )}
      {RatingNote && (
        <View style={MainStyles.rowMargin}>
          <View style={MainStyles.flexRowFlexStart}>
            <Icon
              style={MainStyles.CardIcon}
              fill={themeColors.icon}
              name="message-circle-outline"
            />
            <Text style={MainStyles.textCardJob}>
              {RatingNote
                ? "Phản hồi: " + RatingNote?.trim()
                : " Khách hàng không để lại phản hồi"}
            </Text>
          </View>
        </View>
      )}
      {
        CreateAtDatabse && (
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill={themeColors.icon}
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo: {FormatDate(CreateAtDatabse)}
              </Text>
            </View>
          </View>
        )
      }
      {
        CreateAtFirebase && (
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill={themeColors.icon}
                name="calendar-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Thời gian tạo: {dateTimeFormat(CreateAtFirebase, 2)}
              </Text>
            </View>
          </View>
        )
      }
      {
        Address && (
          <View style={MainStyles.rowMargin}>
            <View style={MainStyles.flexRowFlexStart}>
              <Icon
                style={MainStyles.CardIcon}
                fill={themeColors.icon}
                name="pin-outline"
              />
              <Text style={MainStyles.textCardJob}>
                Địa chỉ: {Address}
              </Text>
            </View>
          </View>
        )
      }
      <View
        style={MainStyles.cardContentJob}
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
            {FormatMoney(PriceAfterDiscount)} VND
          </Text>
        </View>
      </View>

    </>
  );
};

export default CardContent;
