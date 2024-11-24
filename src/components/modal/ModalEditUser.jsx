import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import ModalSelectOption from "./ModalSelectOption";
import BtnGetImageModal from "../BtnGetImageModal";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../styles/Colors";
import { mainAction } from "../../Redux/Action";
import { consoleLog, setData } from "../../Utils";
import { AlertToaster } from "../../Utils/AlertToaster";
import { PropTypes } from "prop-types";

const ModalEditUser = ({ isModalVisible, setModalVisible }) => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [avatar, setAvatar] = useState([]);
  const [userName, setUserName] = useState(userLogin?.CustomerName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const resetModal = () => {
    if (!userLogin) return;

    setAvatar(userLogin.Avatar ? [userLogin.Avatar] : []);
    setUserName(userLogin.CustomerName || "");
    setIsLoading(false);
    setModalVisible(false);
  };
  const valid = () => {
    if (!userName?.trim()) {
      setMessage("Không để trống tên khách hàng");
      return false;
    }
    setMessage("");
    return true;
  };
  const handleConfirm1 = async () => {
    setIsLoading(true);
    const isValid = valid();
    if (isValid) {
      try {
        const pr = {
          CustomerId: userLogin?.Id || 0,
          CustomerName: userName,
          Avatar: avatar.join("") ? avatar.join("") : userLogin?.Avatar,
          CustomerPhone: userLogin?.Phone,
          CustomerAddress: "",
          CustomerEmail: "",
          UserId: "",
          GroupId: 10060,
        };

        const params = {
          Json: JSON.stringify(pr),
          func: "OVG_spCustomer_Save",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        if (result?.Status === "OK") {
          AlertToaster("success", "Cập nhật thành công");
          const userChange = {
            ...userLogin,
            Avatar: avatar.join("") ? avatar.join("") : userLogin?.Avatar,
            CustomerName: userName,
            Phone: userLogin?.Phone,
          };
          mainAction.userLogin(userChange, dispatch);
          setData(StorageNames.USER_PROFILE, userChange);
          resetModal();
          setIsLoading(false);
        } else {
          AlertToaster("error", result?.ReturnMess);
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
    }

    setIsLoading(false);
    // setModalVisible(false);
  };
  const handleConfirm2 = () => {
    // onConfirm2();
    resetModal();
    // setModalVisible(false);
  };

  return (
    <ModalSelectOption
      titleBtn1={"Cập nhật"}
      titleBtn2={"Hủy"}
      isVisible={isModalVisible}
      onClose={resetModal}
      title="Cập nhật thông tin"
      backdropCloseable={false}
      onConfirm1={handleConfirm1}
      onConfirm2={handleConfirm2}
      // useLogo={false}
      isBtn1Loading={isLoading}
    >
      <View>
        <View style={[MainStyles.cardJob]}>
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <Text
            style={{
              margin: 5,
              fontSize: 16,
              fontWeight: "700",
              color: colors.MAIN_BLUE_CLIENT,
            }}
          >
            Ảnh đại diện
          </Text>
          <View style={MainStyles.flexRowCenter}>
            <BtnGetImageModal
              setImageUrl={setAvatar}
              btnWidth={SCREEN_WIDTH * 0.5}
              btnHeight={SCREEN_HEIGHT * 0.25}
              imgPreview={userLogin?.Avatar}
            />
          </View>
          <Text
            style={{
              margin: 5,
              fontSize: 16,
              fontWeight: "700",
              color: colors.MAIN_BLUE_CLIENT,
            }}
          >
            Họ tên
          </Text>
          <TextInput
            style={{
              height: 36,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            placeholder="Nhập tên ở đây ..."
            onChangeText={setUserName}
            value={userName}
          />
        </View>
        <View>
          <Text style={{ color: colors.ERROR, textAlign: "center" }}>
            {message}
          </Text>
        </View>
      </View>
    </ModalSelectOption>
  );
};

ModalEditUser.defaultProps = {
  isModalVisible: false,
  setModalVisible: () => { },
  onConfirm1: () => { },
  onConfirm2: () => { },
};
ModalEditUser.propTypes = {
  isModalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm1: PropTypes.func,
  onConfirm2: PropTypes.func,
};

export default ModalEditUser;
