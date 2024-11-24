import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../styles/Colors";
import MainStyles, { SCREEN_WIDTH } from "../styles/MainStyle";
import { PropTypes } from "prop-types";
import { FormatMoney } from "../Utils";

const VoucherComponent = ({
  vouchers,
  selectedVouchers,
  setSelectedVouchers,
  limit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectVoucher = (voucher) => {
    if (selectedVouchers.includes(voucher)) {
      setSelectedVouchers(
        selectedVouchers.filter((v) => v.VoucherId !== voucher.VoucherId)
      );
    } else if (selectedVouchers.length < limit) {
      setSelectedVouchers([...selectedVouchers, voucher]);
    }
  };

  const handleApplyVouchers = () => {
    setModalVisible(false);
  };

  const handleClearVouchers = () => {
    setSelectedVouchers([]);
  };

  const renderVoucher = ({ item }) => {
    const isSelected = selectedVouchers.includes(item);
    const isDisabled = !isSelected && selectedVouchers.length >= limit;

    let backgroundColorStyle = styles.voucherItem;
    if (isSelected) {
      backgroundColorStyle = [styles.voucherItem, styles.selectedVoucher];
    } else if (isDisabled) {
      backgroundColorStyle = [styles.voucherItem, styles.disabledVoucher];
    }

    return (
      <TouchableOpacity
        onPress={() => !isDisabled && handleSelectVoucher(item)}
        style={backgroundColorStyle}
        disabled={isDisabled}
      >
        <View style={[MainStyles.flexRowFlexStart, { alignItems: "center" }]}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 23,
            }}
          >🎁</Text>
          <View style={styles.voucherContent}>
            <Text style={styles.voucherCode}>
              Mã voucher: {item?.VoucherCode}
            </Text>
            <Text style={styles.voucherDiscount}>
              Giảm{" "}
              {item?.TypeDiscount === 2
                ? `${FormatMoney(item?.Discount || 0)} VND`
                : `${item?.Discount}%`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={MainStyles.cardConfirmContainer}>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => setModalVisible(true)}
      >
        <View style={MainStyles.flexRowFlexStartAlignCenter}>
          <Text style={{ fontSize: 20 }}>🎁</Text>
          <Text
            style={MainStyles.textCardJob}
          >{`${selectedVouchers.length}  Mã giảm giá đã chọn`}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: colors.MAIN_BLUE_CLIENT,
            }}
          >
            Chọn mã giảm giá
          </Text>
          <View style={MainStyles.flexRowCenter}>
            <View
              style={{
                marginBottom: 10,
                width: SCREEN_WIDTH * 0.7,
                backgroundColor: colors.MAIN_BLUE_CLIENT,
                height: 1,
              }}
            ></View>
          </View>
          {vouchers.length > 0 ? (
            <FlatList
              data={vouchers}
              renderItem={renderVoucher}
              keyExtractor={(item) => item?.VoucherId.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text style={{ textAlign: "center", marginVertical: 30 }}>
              Không có voucher cho dịch vụ này
            </Text>
          )}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.footerButton, styles.applyButtonColor]}
              onPress={handleApplyVouchers}
            >
              <Text style={styles.footerButtonText}>Áp dụng</Text>
            </TouchableOpacity>
            {selectedVouchers.length > 0 && (
              <TouchableOpacity
                style={[styles.footerButton, styles.clearButtonColor]}
                onPress={handleClearVouchers}
              >
                <Text style={styles.footerButtonText}>Gỡ bỏ</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.footerButton, styles.cancelButtonColor]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.footerButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
VoucherComponent.defaultProps = {
  limit: 1,
};
VoucherComponent.propTypes = {
  vouchers: PropTypes.array.isRequired,
  selectedVouchers: PropTypes.array.isRequired,
  setSelectedVouchers: PropTypes.func.isRequired,
  limit: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.8,
  },
  applyButtonText: {
    color: colors.BLACK,
    fontSize: 16,
  },
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    maxHeight: Dimensions.get("window").height * 0.6,
  },
  voucherItem: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E7F7F7",
    borderRadius: 10,
    backgroundColor: colors.WHITE,
  },
  voucherContent: {
    flex: 1,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  voucherCode: {
    fontSize: 14,
    color: colors.BLACK,
  },
  voucherDiscount: {
    fontSize: 14,
    color: colors.RED,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  footerButtonText: {
    color: "white",
    fontSize: 14,
  },
  selectedVoucher: {
    backgroundColor: "#fffacddd", // Màu vàng nhạt
    borderColor: "#ffd700", // Màu vàng
  },
  disabledVoucher: {
    backgroundColor: "#E7F7F7", // Màu xám
    borderColor: "#cccccc", // Màu xám
  },
  applyButtonColor: {
    backgroundColor: "#28a745", // Màu xanh lá
  },
  cancelButtonColor: {
    backgroundColor: "#dc3545", // Màu đỏ
  },
  clearButtonColor: {
    backgroundColor: "#ffc107", // Màu vàng
  },
});

export default VoucherComponent;
