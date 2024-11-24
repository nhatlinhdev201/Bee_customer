import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

const ModalBottom = () => {
    return (
        <Modal
            transparent={true}
            isVisible={modalPerson}
            onBackdropPress={() => { }}
            backdropOpacity={0.3}
            style={styles.modal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.dragHandle} />
                    <View style={[MainStyles.flexRowCenter, { marginBottom: 20 }]}>
                        <Text style={styles.headerTitle}>Thông tin khách hàng</Text>
                    </View>
                    <CustomLabel>Tên khách hàng</CustomLabel>
                    <CustomInput
                        placeholder="Thêm tên khách hàng ..."
                        onChangeText={(text) => { setCustomerInfo({ ...customerInfo, CustomerInfoName: text }) }}
                        onBlur={() => { }}
                        value={customerInfo?.CustomerInfoName}
                        borderColor={
                            customerInfo?.CustomerInfoName === "" ? "red" : "#E0E0E0"
                        }
                    />
                    <CustomFormError>
                        {customerInfo?.CustomerInfoName === "" ? "Vui lòng thêm tên khách hàng" : ""}
                    </CustomFormError>

                    <CustomLabel>Số điện thoại</CustomLabel>
                    <CustomInput
                        placeholder="Thêm số điện thoại"
                        onChangeText={(text) => { setCustomerInfo({ ...customerInfo, CustomerInfoPhone: text }) }}
                        onBlur={() => { }}
                        value={customerInfo?.CustomerInfoPhone}
                        borderColor={
                            customerInfo?.CustomerInfoPhone === "" ? "red" : "#E0E0E0"
                        }
                    />
                    <CustomFormError>
                        {customerInfo?.CustomerInfoPhone === "" ? "Vui lòng thêm số điện thoại" : ""}
                    </CustomFormError>
                    <View style={styles.buttonContainer}>
                        <BtnDouble
                            title1="Cập nhật"
                            title2="Hủy thay đổi"
                            bgColor1={themeColors.success}
                            btn1Disabled={customerInfo?.CustomerInfoName === "" || customerInfo?.CustomerInfoPhone === ""}
                            onConfirm1={() => {
                                handleConfirmChangeCustomer();
                            }}
                            bgColor2={themeColors.cancel}
                            onConfirm2={() => {
                                handleCancelChangeCustomer()
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      dragHandle: {
        width: 90,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        alignSelf: "center",
        marginVertical: 10,
      },
      modalContainer: {
        width: SCREEN_WIDTH,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
      },
      modalContent: {},
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        marginBottom: 20,
      }
})