import React from "react";
import { View } from "react-native";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import Box from "./Box";
import BtnDouble from "./BtnDouble";
import CardContent from "./CardContent";

const CardNewJob = ({
  data,
  setStaffInformation = () => { },
  setModalVisible = () => { },
}) => {
  const navi = useNavigation();
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={MainStyles.cardJob}>
        <View>
          <CardContent
            ServiceName={data?.DataService?.ServiceName || ""}
            BookingCode={data?.BookingCode || ""}
            StaffTotal={data?.DataService?.StaffTotal || 0}
            TotalRoom={data?.DataService?.RoomTotal || 0}
            OptionName={data?.DataService?.SelectOption?.length > 0 ? data?.DataService?.SelectOption[0]?.OptionName : ""}
            TimeWorking={data?.DataService?.TimeWorking || ""}
            OtherService={data?.DataService?.OtherService?.length > 0 ? data?.DataService?.OtherService : []}
            Voucher={data?.DataService?.Voucher?.length > 0 ? data?.DataService?.Voucher : []}
            NoteBooking={data?.DataService?.NoteBooking || ""}
            CreateAtFirebase={data?.CreateAt || ""}
            Address={data?.DataService?.Address || ""}
            PriceAfterDiscount={data?.DataService?.PriceAfterDiscount || 0}
          />
          <Box height={SCREEN_HEIGHT * 0.01} />
          <BtnDouble
            title1={"Chi tiết dịch vụ"}
            title2={"Thông tin nhân viên"}
            onConfirm1={() => {
              navi.navigate(ScreenNames.CASH_SCREEN, { data: data });
            }}
            onConfirm2={() => {
              setStaffInformation(data);
              setModalVisible(true);
            }}
            bgColor2="#3366FF"
          />
        </View>
        <Box height={SCREEN_HEIGHT * 0.01} />
      </View>
    </View>
  );
};

export default CardNewJob;
