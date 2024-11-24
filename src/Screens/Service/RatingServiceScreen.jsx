import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import { ic_human } from "../../assets";
import { useState } from "react";
import RatingTouch from "../../components/RatingTouch";
import Label from "../../components/Label";
import MainStyles from "../../styles/MainStyle";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { ScreenNames } from "../../Constants";
import { Spinner } from "@ui-kitten/components";
import { TextInput } from "react-native";
import { colors } from "../../styles/Colors";
import { GroupUserId } from "../../Utils";
import { mainAction } from "../../Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../../components/ModalConfirm";

const RatingServiceScreen = () => {
  const route = useRoute();
  const { data } = route.params || {};
  const userLogin = useSelector((state) => state.main.userLogin);
  const navi = useNavigation();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState("");
  const [isSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAlertVisible, setIsModalAlertVisible] = useState(false);

  const onGoToHome = () => {
    if (rating < 4 && note === "") {
      setIsModalAlertVisible(true);
    } else {
      navi.reset({
        routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
      });
    }
  };

  const OVG_spCustomer_Review_Save = async () => {
    setIsLoading(true);
    try {
      const pr = {
        BookingId: data?.OrderId,
        CustomerId: userLogin?.Id,
        ListOfficer: data?.ListOfficer,
        StartNumber: rating,
        Note: note,
        GroupUserId: GroupUserId,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spCustomer_Review_Save",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result.Status === "OK") {
        setIsModalVisible(true);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  const onSubmitRating = () => {
    if (rating < 4 && note === "") {
      setIsModalAlertVisible(true);
    } else {
      OVG_spCustomer_Review_Save();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={MainStyles.containerClient}>
        <LayoutGradientBlue>
          <View style={{ padding: 20 }}>
            <View>
              {data?.StaffAvt ? (
                <Image
                  source={ic_human}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              ) : (
                <Image
                  source={ic_human}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              )}
            </View>
            <Text style={MainStyles.title_1}>Đánh giá dịch vụ</Text>
            <Text style={MainStyles.subtitle_1}>
              Bạn thấy dịch vụ của chúng tôi như thế nào ? hãy để lại đánh giá
              cho chúng tôi về chất lượng dịch vụ. Cảm ơn đã tin tưởng và sử
              dụng dịch vụ của chúng tôi ! Hẹn gặp lại.
            </Text>
            <View style={[MainStyles.flexRowCenter, { marginTop: 20 }]}>
              <RatingTouch
                rating={rating}
                fontSize={[30, 30]}
                onRate={setRating}
              />
            </View>
            <Label>Ghi chú</Label>
            <TextInput
              style={styles.textArea}
              placeholder="Hãy để lại lời nhắn về dịch vụ và nhân viên ở đây ..."
              value={note}
              onChangeText={setNote}
              multiline={true}
              blurOnSubmit={true}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <LayoutBottom>
            <View style={styles.buttonContainer}>
              {isSubmit ? null : (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={onSubmitRating}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Text style={styles.buttonText}>Gửi đánh giá</Text>
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onGoToHome}
              >
                <Text style={styles.buttonText}>Về trang chính</Text>
              </TouchableOpacity>
            </View>
          </LayoutBottom>
          <ModalConfirm
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            onConfirm={onGoToHome}
            modalTitle="Đã đánh giá"
            title={
              "Cảm ơn quý khách đã để lại đánh giá cho dịch vụ này. Hẹn gặp lại trong những dịch vụ tới, Ong Vàng xin cảm ơn !"
            }
            btnConfirmTiTle="Về trang chính"
            backdropClose={true}
          />
          <ModalConfirm
            isModalVisible={isModalAlertVisible}
            setModalVisible={setIsModalAlertVisible}
            onConfirm={() => setIsModalAlertVisible(false)}
            modalTitle="Thông báo"
            title={`Bạn đã để lại đáng giá thấp cho dịch vụ của chúng tôi ! Vui lòng viết thêm ghi chú cụ thể về sự không hài lòng này. Chúng tôi sẽ lắng nghe ý kiến đóng góp để cải thiện dịch vụ. Xin cảm ơn !`}
            btnConfirmTiTle="Thêm ghi chú"
            backdropClose={true}
          />
        </LayoutGradientBlue>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textArea: {
    height: 200,
    borderColor: "gray",
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    textAlignVertical: "top",
  },
});

export default RatingServiceScreen;
