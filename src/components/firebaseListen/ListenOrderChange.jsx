import { Text, View } from "react-native";
import AlertModal from "../AlertModal";
import MainStyles from "../../styles/MainStyle";
import { colors } from "../../styles/Colors";
import { PropTypes } from "prop-types";
import React from "react";

const ListenOrderChange = ({
  orderChange,
  isModalVisible,
  setModalVisible,
  onConfirm,
}) => {
  const hideModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    onConfirm();
    hideModal();
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={hideModal}
      isAuto={false}
      onConfirm={handleConfirm}
      title="Thông báo dịch vụ"
      backdropCloseable={true}
      isCancelable={false}
    >
      <View>
        {orderChange?.orderId ? (
          <View style={[MainStyles.cardJob]}>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[MainStyles.titleCardJob, { textAlign: "center" }]}>
                {orderChange?.DataService?.ServiceName}
              </Text>
            </View>
            {orderChange?.BookingCode ? (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: colors.primary[700],
                  fontWeight: "bold",
                }}
              >
                {orderChange?.BookingCode}
              </Text>
            ) : null}
            <View style={MainStyles.flexRowCenter}>
              <View style={MainStyles.line} />
            </View>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[{ textAlign: "center" }]}>
                {"Nhân viên " +
                  orderChange?.StaffName +
                  " đã nhân đơn dịch vụ của bạn." +
                  orderChange?.StaffName +
                  " sẽ đến làm việc ngay. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !"}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </AlertModal>
  );
};

ListenOrderChange.defaultProps = {
  orderChange: {},
  isModalVisible: false,
  setModalVisible: () => {},
  onConfirm: () => {},
};
ListenOrderChange.propTypes = {
  orderChange: PropTypes.object,
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ListenOrderChange;
