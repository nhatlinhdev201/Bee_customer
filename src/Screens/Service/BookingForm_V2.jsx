import { memo } from "react"
import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors, themeColors } from "../../styles/Colors";
import MainStyles from "../../styles/MainStyle";
import { UseInset } from "../../Hooks";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import ModalInformationDetail from "../../components/ModalInformationDetail";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { consoleLog, FormatMoney, getData } from "../../Utils";
import { getTotalPrice } from "../../Utils/PriceService";
import { RoundUpNumber } from "../../Utils/RoundUpNumber";
import ButtonInfo from "../../components/buttons/ButtonInfo";
import ArrowRight from "../../components/svg/ArrowRight";
import { useDispatch } from "react-redux";
import { mainAction } from "../../Redux/Action";
import { LayoutService, LocationSelect } from "../../components/services";
import { StorageNames } from "../../Constants";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { ModalSelectLocation } from "../../components/ModalSelectLocation";
import ServiceSelection from "../../components/forms/ServiceSelection";

const BookingFormComp = () => {
  const route = useRoute();
  const { service } = route.params || {};
  const { previous } = route.params || false;
  const price = service?.ServicePrice;
  const workingTime = service?.ServiceTime;
  const [time, setTime] = useState(workingTime);
  const inset = UseInset();
  const formikSubmitRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailContent, setDetailContent] = useState({});
  const [locations, setLocations] = useState({});
  const [locationSelect, setLocationSelect] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      getLocation();
    }, [])
  );
  useEffect(() => {
    OVG_spStepContent_Service();
  }, []);

  const getLocation = async () => {
    try {
      const location = await getData(StorageNames.LOCATION);
      setLocations(location.slice(0, 4));
      setLocationSelect(location.find((item) => item.Selected));
    } catch {
      //
    }
  }
  const OVG_spStepContent_Service = async () => {
    try {
      const pr = {
        ServiceId: service?.ServiceId,
        GroupId: 10060,
      };
      const params = {
        Json: JSON.stringify(pr),
        func: "OVG_spStepContent_Service",
      };
      const result = await mainAction.API_spCallServer(params, dispatch);
      setDetailContent(result[0]);
    } catch {
      //
    }
  };
  const modalOnClose = () => {
    setModalOpen(false);
  };
  const handleNext = () => {
    formikSubmitRef.current?.submitForm();
  };
  const handleFormChange = (values) => {
    values.people ? setTime(workingTime / values.people) : setTime(workingTime);
    setTotalPrice(getTotalPrice(service?.ServiceId, values, price));
  };

  const goConfirm = () => {
    formikSubmitRef.current?.submitForm();
  };

  return (
    <View style={styles.container}>
      <LocationSelect
        initData={locations}
        locationSelect={locationSelect}
        setLocationSelect={setLocationSelect}
        isModalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onOption={() => setModalOpen(true)}
      />
      <ScrollView>
        <KeyboardAwareScrollView extraScrollHeight={40} enableOnAndroid>
          <LayoutService
            ref={formikSubmitRef}
            timeWorking={time}
            onChange={handleFormChange}
            Service={service}
            TotalPrice={totalPrice}
            Location={locationSelect}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      <LayoutBottom>
        <Text
          style={{
            color: themeColors.textMain,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",

          }}
        >Dịch vụ {service?.ServiceName ? service?.ServiceName.toLowerCase() : ""}</Text>
        <View
          style={{
            zIndex: 10,
            elevation: 10,
            backgroundColor: themeColors.confirm,
            width: "95%",
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <ButtonInfo
            style={{
              width: "98%",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={handleNext}
          >
            <View
              style={[
                MainStyles.flexRowSpaceBetween,
                { backgroundColor: "transparent", },

              ]}
            >
              <Text style={styles.btnTitle}>
                {FormatMoney(totalPrice) +
                  " VND / " +
                  RoundUpNumber(time, 0) +
                  " giờ"}
              </Text>
              <View style={[MainStyles.flexRow, { alignItems: "center" }]}>
                <Text style={[styles.btnTitle, { marginRight: 10 }]}>
                  Tiếp theo
                </Text>
                <ArrowRight color={colors.WHITE} />
              </View>
            </View>
          </ButtonInfo>
        </View>
      </LayoutBottom>
      <ModalInformationDetail
        isOpen={modalOpen}
        onClose={modalOnClose}
        snapPoints={["60%", "80%"]}
        initialIndex={1}
        content={detailContent}
      ></ModalInformationDetail>
      <ModalSelectLocation
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onClose={() => setModalVisible(false)}
        snapPoints={["60%", "80%"]}
        initialIndex={1}
        service={service}
        locations={locations}
        setLocations={setLocations}
        locationSelect={locationSelect}
        setLocationSelect={setLocationSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  btnTitle: {
    fontSize: 18,
    color: colors.WHITE,
  },
});


export const BookingForm_V2 = memo(BookingFormComp);