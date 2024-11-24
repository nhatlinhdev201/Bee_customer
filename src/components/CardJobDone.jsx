import React from "react";
import { View } from "react-native";
import MainStyles, { SCREEN_HEIGHT } from "../styles/MainStyle";
import BtnDouble from "./BtnDouble";
import Box from "./Box";
import ModalAlertSelectOption from "./modal/ModalAlertSelectOption";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../Constants";
import { getRouterById } from "../Utils/RoutingService";
import { useSelector } from "react-redux";
import { dataMenu } from "../Screens/data";
import { PropTypes } from "prop-types";
import CardContent from "./CardContent";
import { AlertToaster } from "../Utils/AlertToaster";
import { getData } from "../Utils";

const CardJobDone = ({ data }) => {
  const navi = useNavigation();
  const userLogin = useSelector((state) => state.main.userLogin);
  const menu = useSelector((state) => state.main.menuService);

  const handleReBooking = async () => {
    try {
      const service = menu.find((item) => item?.ServiceId === data?.ServiceId);
      navi.navigate(ScreenNames.BOOKING_FORM_SCREEN, {
        service: service,
        previous: true,
      });
    } catch (error) {
      AlertToaster("error", "Dịch vụ hiện không hỗ trợ !");
      return
    }
  };

  const handleRating = () => {
    navi.navigate(ScreenNames.RATING_SERVICE, {
      data: {
        OrderId: data?.Id,
        CustomerId: userLogin?.Id,
        ListOfficer: data?.OfficerServiceDetail,
      },
    });
  };

  return (
    <View style={MainStyles.cardJob}>
      <View>
        <CardContent
          ServiceName={data?.ServiceName || ""}
          BookingCode={data?.BookingServiceCode || ""}
          StaffTotal={data?.TotalStaff || 0}
          TotalRoom={data?.RoomTotal || 0} // đang thiếu
          OptionName={data?.OptionName || ""} // đang thiếu
          TimeWorking={data?.TimeWorking || ""}
          OtherService={data?.DataService?.length > 0 ? data?.DataService : []}
          Voucher={data?.Voucher?.length > 0 ? data?.Voucher : []} // đang thiếu
          NoteBooking={data?.NoteBooking || ""} // đang thiếu
          CreateAtFirebase={""}
          CreateAtDatabse={data?.BookingTime || ""}
          AddressService={data?.DataService?.Address || ""}
          PriceAfterDiscount={data?.PriceAfterDiscount || 0}
          RatingNote={data?.RatingNote || ""}
          Star={data?.Star || 0}
          TotalMoney={data?.TotalMoney || 0}
        />
      </View>
      <Box height={SCREEN_HEIGHT * 0.01} />
      <BtnDouble
        title1={"Đặt lại đơn"}
        title2={"Đánh giá "}
        btn2Visible={!data?.RatingNote}
        onConfirm1={handleReBooking}
        onConfirm2={handleRating}
      />
    </View>
  );
};

CardJobDone.defaultProps = {
  data: {},
  modalRef: {},
};
CardJobDone.propTypes = {
  data: PropTypes.object,
  modalRef: PropTypes.object,
};

export default CardJobDone;
