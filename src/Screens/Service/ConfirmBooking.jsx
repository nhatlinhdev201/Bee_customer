import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import { colors, themeColors } from "../../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { ic_coin } from "../../assets";
import Box from "../../components/Box";
import { consoleLog, FormatMoney, GroupUserId, prints, removeData, setData } from "../../Utils";
import Button from "../../components/buttons/Button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import { ScreenNames, StorageNames } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { mainAction } from "../../Redux/Action";
import ArrowRight from "../../components/svg/ArrowRight";
import { AlertToaster } from "../../Utils/AlertToaster";
import VoucherComponent from "../../components/VoucherComponent";
import { calculateDiscount } from "../../Utils/calculateDiscount";
import Modal from "react-native-modal";
import Loading from "../../components/Loading";
import ModalRequired from "../../components/modal/ModalRequired";
import ModalSelectOption from "../../components/modal/ModalSelectOption";
import { Icon } from "@ui-kitten/components";
import { Header } from "../../components/HeaderComp";
import BtnDouble from "../../components/BtnDouble";
import CustomLabel from "../../components/forms/CustomLabel";
import CustomInput from "../../components/forms/CustomInput";
import CustomFormError from "../../components/forms/CustomFormError";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ConfirmBooking = () => {
  const userLogin = useSelector((state) => state.main.userLogin);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const { dataConfirmService } = route.params || {};

  const navi = useNavigation();
  const [payment, setPayment] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(
    dataConfirmService?.TotalPrice
  );
  //vouvher
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const limit = 1;
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAlertVisible, setIsModalAlertVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isOver, setIsOver] = useState(false);
  const isMounted = useRef(true);
  const [serviceFull, setServiceFull] = useState({
    CustomerId: userLogin?.Id || 0,
    CustomerName: userLogin?.CustomerName || "",
    CustomerPhone: userLogin?.Phone || 0,
    Lat: dataConfirmService?.Latitude || 0.0,
    Lng: dataConfirmService?.Longitude || 0.0,
    ServiceId: dataConfirmService?.ServiceId || 0,
    ServiceName: dataConfirmService?.ServiceName || "",
    TotalMoney: dataConfirmService?.TotalPrice || 0,
    Payment: payment ? 1 : 0,
    StaffTotal: dataConfirmService?.StaffTotal || 0,
    RoomTotal: dataConfirmService?.RoomTotal || 0,
    Premium: dataConfirmService?.premium ? 1 : 0,
    TimeService: RoundUpNumber(dataConfirmService?.TimeWorking, 0) || 0,
    ServiceCode: dataConfirmService?.ServiceCode || "",
    Note: dataConfirmService?.Note || "",
    AddressService: dataConfirmService?.Address || "",
    HouseNumber: dataConfirmService?.HouseNumber || "",
    AddressType: dataConfirmService?.Type || "Nhà ở",
    SelectedDetail: dataConfirmService?.SelectedDetail || {},
    UsedVoucher: selectedVouchers.length > 0 ? 1 : 0,
    Voucher: selectedVouchers || [],
    PriceAfterDiscount: dataConfirmService?.TotalPrice || 0,
    TotalDiscount: totalDiscount || 0,
    VoucherId: selectedVouchers[0]?.VoucherId || 0,
    GroupUserId: GroupUserId || 0,
    CustomerInfoName: userLogin?.CustomerName || "",
    CustomerInfoPhone: userLogin?.Phone || "",
  });
  const [modalPerson, setModalPerson] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    CustomerInfoName: userLogin?.CustomerName || "",
    CustomerInfoPhone: userLogin?.Phone || "",
  })

  const handleBooking = async () => {
    isMounted.current = true;
    OVG_spService_BookingService_Save();
    resetModalState();
  };

  const handleCancel = async () => {
    setIsOver(false);
    await removeStorage();
    setIsModalVisible(false);
    isMounted.current = false;
    resetModalState();
  };

  const showConfirmModal = () => {
    if (userLogin) {
      setIsModalVisible(true);
    } else {
      if (dataConfirmService) {
        setIsModalAlertVisible(true);
      }
    }
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^(?:\+84|0)(?:\d{9}|\d{9})$/;
    let valid = phoneRegex.test(phoneNumber);

    if (!valid) {
      setErrorPhone('Số điện thoại không hợp lệ');
      return false;
    } else {
      setErrorPhone('');
      return true;
    }
  }
  const [errorPhone, setErrorPhone] = useState('');

  const resetModalState = () => {
    setCountdown(5);
    // setSelectedVouchers([]);
  };
  const removeStorage = async () => {
    await removeData(StorageNames.SERVICE_CONFIRM);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = async () => {
        await removeStorage();
        navi.goBack();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navi])
  );
  useFocusEffect(
    useCallback(() => {
      OVG_spVoucher_List();
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, [])
  );

  useEffect(() => {
    if (isModalVisible) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleBooking();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isModalVisible]);

  useEffect(() => {
    onchangeDiscount();
  }, [selectedVouchers, priceAfterDiscount]);

  const onchangeDiscount = () => {
    let final = calculateDiscount(selectedVouchers, dataConfirmService?.TotalPrice).finalAmount
    let total = dataConfirmService?.TotalPrice - priceAfterDiscount
    setPriceAfterDiscount(final);
    setTotalDiscount(total);
    setServiceFull({
      ...serviceFull,
      PriceAfterDiscount: final,
      TotalDiscount: total
    })
  }

  // lưu đơn có nhân viên nhận
  const OVG_spService_BookingService_Save = async () => {
    setLoading(true);
    const maxRetries = 5;
    let retryCount = 0;
    const calling = async () => {
      if (!isMounted.current) return;
      try {
        const pr = {
          ...serviceFull,
          CustomerInfoName: customerInfo.CustomerInfoName,
          CustomerInfoPhone: customerInfo.CustomerInfoPhone
        };
        const params = {
          Json: JSON.stringify(pr),
          func: "OVG_spService_BookingService_Save_V2",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        if (result?.Status === "OK") {
          await removeStorage();
          const idFirebaseObject = JSON.parse(result.ListData[0].IdFirebase.IdFirebase);
          navi.reset({
            index: 0,
            routes: [
              {
                name: ScreenNames.VIEW_ALL_STAFF,
                params: { id: { OrderId: idFirebaseObject.name } },
              },
            ],
          });
          setLoading(false);
          setIsModalVisible(false);
          return;
        } else if (result?.Status === "NOTOK" && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retry ${retryCount}/${maxRetries}`);
          setTimeout(calling, 10000);
        } else {
          if (retryCount >= maxRetries) {
            // console.log(`Exceeded maximum retries (${maxRetries})`);
            setIsModalVisible(false);
            setLoading(false);
            setTimeout(() => {
              setIsOver(true);
            }, 1000);
          } else {
            AlertToaster("error", "Hệ thống quá tải !");
            await removeStorage();
            setIsModalVisible(false);
            setLoading(false);
          }
          setLoading(false);
          setIsModalVisible(false);
        }
        setLoading(false);
      } catch {
        // console.log("error", error);
        await removeStorage();
        setLoading(false);
        setIsModalVisible(false);
      }
    };
    calling();
  };

  // lưa đơn không có nhân viên nhận
  const OVG_spService_BookingService_Save_Not_Officer = async () => {
    setLoading(true);
    await removeStorage();
    try {
      const pr = {
        ...serviceFull,
        CustomerInfoName: customerInfo.CustomerInfoName,
        CustomerInfoPhone: customerInfo.CustomerInfoPhone,

        IsConfirm: 0
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spService_BookingService_Save_V2",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      if (result?.Status === "OK") {
        AlertToaster("success", "Đơn dịch vụ đã được gửi tới admin");
        navi.reset({
          routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
        });
        setLoading(false);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  // Thêm voucher
  const OVG_spVoucher_List = async () => {
    try {
      const pr = {
        GroupUserId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spVoucher_Customer",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      setVouchers(result);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  /* #Region modal thay infomation customer */
  const handleConfirmChangeCustomer = () => {
    if (customerInfo.CustomerInfoName && customerInfo.CustomerInfoPhone) {
      setModalPerson(false);
      setServiceFull({
        ...serviceFull,
        CustomerInfoName: customerInfo.CustomerInfoName,
        CustomerInfoPhone: customerInfo.CustomerInfoPhone
      })
    } else {
      return
    }
  }
  const handleCancelChangeCustomer = () => {
    setModalPerson(false);
    setCustomerInfo({
      CustomerInfoName: userLogin?.CustomerName,
      CustomerInfoPhone: userLogin?.Phone
    })
  }
  /* #Endregion modal thay infomation customer */
  return (
    <View style={MainStyles.containerClient}>
      <Header headerTitle={`Dịch vụ ${serviceFull?.ServiceName.toLowerCase()}`} />
      <ScrollView>
        <View style={MainStyles.contentContainerClient}>
          <Text style={MainStyles.cardLabelConfirm}>Nơi làm việc</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="pin-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  {serviceFull?.AddressService}
                </Text>
              </View>
            </View>

            <View style={MainStyles.rowMargin}>
              <View style={[
                MainStyles.flexRowSpaceBetween
              ]}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill={themeColors.icon}
                    name="person-outline"
                  />
                  <View>
                    <Text style={[
                      MainStyles.textCardJob,
                      {
                        fontWeight: "bold",
                        color: themeColors.textMain
                      }]}>{serviceFull?.CustomerInfoName}</Text>
                    <Text
                      style={MainStyles.textCardJob}
                    >{serviceFull?.CustomerInfoPhone}</Text>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={[{
                    backgroundColor: themeColors.confirm,
                    borderRadius: 8,
                    padding: 5,
                    paddingHorizontal: 10,
                    alignItems: "center",
                  }]}
                  onPress={() => setModalPerson(true)}
                >
                  <Text style={[{ color: themeColors.textWhite }]}>Thay đổi</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>



          <Text style={MainStyles.cardLabelConfirm}>Thông tin dịch vụ</Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowSpaceBetween}>
                <View style={MainStyles.flexRowFlexEnd}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill={themeColors.icon}
                    name="clock-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Làm việc trong: {RoundUpNumber(serviceFull?.TimeService, 0)} giờ
                  </Text>
                </View>
              </View>
            </View>

            {serviceFull?.serviceOption ? (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill={themeColors.icon}
                    name="share-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Loại:{" "}
                    {serviceFull?.serviceOption?.OptionName}
                  </Text>
                </View>
              </View>
            ) : null}
            {serviceFull?.room > 0 ? (
              <View style={MainStyles.rowMargin}>
                <View style={MainStyles.flexRowFlexStart}>
                  <Icon
                    style={MainStyles.CardIcon}
                    fill={themeColors.icon}
                    name="share-outline"
                  />
                  <Text style={MainStyles.textCardJob}>
                    Số phòng: {serviceFull?.room} phòng
                  </Text>
                </View>
              </View>
            ) : null}
            <View style={MainStyles.rowMargin}>
              <View style={MainStyles.flexRowFlexStart}>
                <Icon
                  style={MainStyles.CardIcon}
                  fill={themeColors.icon}
                  name="people-outline"
                />
                <Text style={MainStyles.textCardJob}>
                  Số lượng nhân viên: {serviceFull?.StaffTotal || 0} nhân viên
                </Text>
              </View>
            </View>
          </View>
          {
            serviceFull?.SelectedDetail?.length > 0 ? (
              <>
                <Text style={MainStyles.cardLabelConfirm}>Thiết bị - dụng cụ</Text>
                <View style={MainStyles.cardConfirmContainer}>
                  {
                    serviceFull?.SelectedDetail.map((item) => (
                      <View
                        key={item?.ServiceDetailId?.toString()}
                        style={MainStyles.flexRowFlexStart}
                      >
                        <Icon
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          fill={themeColors.icon}
                          name="plus-outline"
                        />
                        <View style={MainStyles.flexRowFlexStart}>
                          <Text style={[MainStyles.textCardJob]}>
                            {`${item?.DetailName} - ${item?.OptionName} - ${item?.TotalOption} ${item?.Unit}`}
                          </Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
              </>
            ) : (
              null
            )
          }

          <Text style={MainStyles.cardLabelConfirm}>Mã giảm giá</Text>
          <VoucherComponent
            vouchers={vouchers}
            selectedVouchers={selectedVouchers}
            setSelectedVouchers={setSelectedVouchers}
            limit={limit}
          />
          <Text style={MainStyles.cardLabelConfirm}>
            Phương thức thanh toán
          </Text>
          <View style={MainStyles.cardConfirmContainer}>
            <View style={MainStyles.flexRowSpaceBetween}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: payment
                      ? colors.WHITE
                      : themeColors.confirm,
                    borderColor: payment
                      ? colors.MAIN_BLUE_CLIENT
                      : colors.MAIN_COLOR_CLIENT,
                    borderWidth: payment ? 1 : 0,
                  },
                ]}
                onPress={() => {
                  setPayment(false);
                  AlertToaster("success", "Đổi hình thức thanh toán", "Thanh toán tiền mặt");
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: payment ? colors.MAIN_BLUE_CLIENT : colors.WHITE,
                    },
                  ]}
                >
                  Tiền mặt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: payment
                      ? themeColors.confirm
                      : colors.WHITE,
                    borderColor: payment
                      ? colors.MAIN_COLOR_CLIENT
                      : colors.MAIN_BLUE_CLIENT,
                    borderWidth: payment ? 0 : 1,
                  },
                ]}
                onPress={() => {
                  setPayment(true);
                  AlertToaster("success", "Đổi hình thức thanh toán", "Thanh toán chuyển khoản");
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: payment ? colors.WHITE : colors.MAIN_BLUE_CLIENT,
                    },
                  ]}
                >
                  Chuyển khoản
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={MainStyles.flexRowCenter}>
            {totalDiscount > 0 ? (
              <Text>Đã giảm : {FormatMoney(totalDiscount)} VND</Text>
            ) : null}
          </View>
        </View>
        <Box height={SCREEN_HEIGHT * 0.1} />
      </ScrollView>
      <LayoutBottom>
        <View
          style={[MainStyles.flexRowSpaceBetween, { paddingHorizontal: 10 }]}
        >
          <Text style={MainStyles.txtTotalPrice}>Tổng tiền</Text>
          <View
            style={[
              // MainStyles.cardConfirmContainer,
              MainStyles.flexRowFlexEnd,
            ]}
          >
            <Image source={ic_coin} style={{ width: 20, height: 20 }} />
            <Text
              style={{
                color: colors.MAIN_COLOR_CLIENT,
                marginLeft: 10,
                fontSize: 17,
                fontWeight: "700",
              }}
            >
              {FormatMoney(serviceFull?.PriceAfterDiscount || 0)} VND
            </Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            onPress={showConfirmModal}
            // onPress={OVG_spService_BookingService_Save}
            // onPress={OVG_spService_BookingService_Save_Not_Officer}
            isLoading={loading}
            fontSize={18}
            disable={loading}
            bgColor={themeColors.confirm}
            icon={() => <ArrowRight color={colors.WHITE} />}
          >
            <Text>Đặt dịch vụ</Text>
          </Button>
        </View>
        {/* modal đợi dịch vụ */}
        <Modal
          transparent={true}
          isVisible={isModalVisible}
          onBackdropPress={() => { }}
          onBackButtonPress={() => { }}
          backdropOpacity={0.3}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.dragHandle} />
              <View style={[MainStyles.flexRowCenter, { marginBottom: 20 }]}>
                <Text style={styles.headerTitle}>Đã xác nhận đặt dịch vụ</Text>
              </View>
              <Text style={MainStyles.cardLabelConfirm}>
                Dịch vụ
              </Text>
              <View style={MainStyles.cardConfirmContainer}>
                <View style={MainStyles.flexRowSpaceBetween}>
                  <Text style={MainStyles.cardTitleConfirm}>Tên dịch vụ</Text>
                  <Text style={MainStyles.cardTitleConfirm}>
                    {serviceFull?.ServiceName}
                  </Text>
                </View>
                {serviceFull?.serviceOption?.OptionName ? (
                  <View style={MainStyles.flexRowSpaceBetween}>
                    <Text style={MainStyles.cardTitleConfirm}>Loại</Text>
                    <Text style={MainStyles.cardTitleConfirm}>
                      {serviceFull?.serviceOption?.OptionName || ""}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={MainStyles.cardLabelConfirm}>Tổng tiền</Text>
              <View
                style={[
                  MainStyles.cardConfirmContainer,
                  MainStyles.flexRowCenter,
                ]}
              >
                <Image source={ic_coin} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    color: colors.MAIN_COLOR_CLIENT,
                    marginLeft: 10,
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  {FormatMoney(priceAfterDiscount)} VND
                </Text>
              </View>
              <Text style={styles.modalCountdown}>
                {countdown > 2 && countdown !== 5
                  ? "Đặt dịch vụ thành công"
                  : "Đơn dịch vụ đã sẵn sàng, vui lòng đợi nhân viên nhận đơn !"}
              </Text>
              <Loading isLoading={true} />
              {/* {countdown > 2 && countdown !== 5 && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.modalButtonText}>Hủy đơn dịch vụ</Text>
                  </TouchableOpacity>
                </View>
              )} */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.modalButtonText}>Hủy đơn dịch vụ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* end modal đợi dịch vụ */}

        {/* modal chọn lại người đặt dịch vụ */}
        <Modal
          transparent={true}
          isVisible={modalPerson}
          onBackdropPress={handleCancelChangeCustomer}
          backdropOpacity={0.3}
          style={styles.modal}
        >
          {/* <KeyboardAvoidingView
            // style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          > */}
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll={true}
            extraScrollHeight={100}
            enableOnAndroid={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
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
                  onChangeText={(text) => {
                    setCustomerInfo({ ...customerInfo, CustomerInfoPhone: text })
                    isPhoneNumberValid(text)
                  }}
                  onBlur={() => { }}
                  value={customerInfo?.CustomerInfoPhone}
                  borderColor={
                    customerInfo?.CustomerInfoPhone === "" ? "red" : "#E0E0E0"
                  }
                />
                <CustomFormError>
                  {customerInfo?.CustomerInfoPhone === "" ? "Vui lòng thêm số điện thoại" : ""}
                </CustomFormError>
                <CustomFormError>
                  {customerInfo?.CustomerInfoPhone !== "" && errorPhone !== "" ? "Số điện thoại không đúng định dạng" : ""}
                </CustomFormError>
                <View style={styles.buttonContainer}>
                  <BtnDouble
                    title1="Thay đổi"
                    title2="Hủy"
                    btn2Visible={false}
                    bgColor1={themeColors.confirm}
                    btn1Disabled={customerInfo?.CustomerInfoName === "" || customerInfo?.CustomerInfoPhone === "" || errorPhone !== ""}
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
          </KeyboardAwareScrollView>
          {/* </KeyboardAvoidingView> */}
        </Modal>
        {/* end modal chọn lại người đặt dịch vụ */}
      </LayoutBottom>
      <ModalRequired
        title={"Bạn cần đăng nhập để sử dụng chức năng này"}
        isModalVisible={isModalAlertVisible}
        setModalVisible={setIsModalAlertVisible}
        onConfirm1={() => {
          setData(StorageNames.SERVICE_CONFIRM, serviceFull);
          navi.replace(ScreenNames.LOGIN);
        }}
        onConfirm2={() => setIsModalAlertVisible(false)}
      />
      <ModalSelectOption
        onClose={() => handleCancel()}
        title="Thông báo"
        backdropCloseable={true}
        isVisible={isOver}
        titleBtn1={"Đồng ý"}
        titleBtn2={"Hủy đơn dịch vụ"}
        onConfirm1={async () => {
          await removeStorage();
          OVG_spService_BookingService_Save_Not_Officer();
          handleCancel();
          // navi.navigate(ScreenNames.MAIN_NAVIGATOR);
        }}
        onConfirm2={async () => {
          // handleCancel();
          await removeStorage();
          AlertToaster("success", "Hủy đơn dịch vụ", "Đơn dịch vụ của bạn đã được hủy");
          handleCancel();
          navi.reset({
            routes: [{ name: ScreenNames.MAIN_NAVIGATOR }],
          });
        }}
      >
        <View>
          <View style={[MainStyles.cardJob]}>
            <View style={MainStyles.flexRowCenter}>
              <View style={MainStyles.line} />
            </View>
            <View style={MainStyles.flexRowCenter}>
              <Text style={[{ textAlign: "center" }]}>
                {
                  "Chưa có nhân viên cho đơn dịch vụ của bạn, chúng tôi sẽ gửi đơn dịch vụ tới Admin Ong Vàng để hỗ trợ bạn tìm nhân viên cho dịch vụ này."
                }
              </Text>
            </View>
          </View>
        </View>
      </ModalSelectOption>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    paddingTop: 100,
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
  },
  modalCountdown: {
    fontSize: 14,
    color: colors.MAIN_COLOR_CLIENT,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  topLine: {
    height: 4, // Chiều cao của thanh line
    backgroundColor: "#007BFF", // Màu sắc của thanh line
    width: "100%", // Đảm bảo thanh line rộng toàn bộ modal
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.textMain,
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ConfirmBooking;
