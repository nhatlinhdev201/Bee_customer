import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import LayoutAbout from "../../components/layouts/LayoutAbout";
import { colors, themeColors } from "../../styles/Colors";
import CustomSwiper from "../../components/about/CustomSwiper";
import { ScreenNames, StorageNames } from "../../Constants";
import { image_banner_2, image_banner_3, image_banner_4 } from "../../assets";
import Button from "../../components/buttons/Button";
import ArrowRight from "../../components/svg/ArrowRight";
import { consoleLog, setData } from "../../Utils";
import { PropTypes } from "prop-types";
import { useRoute } from "@react-navigation/native";

const dataSlider = [
  {
    title: "Dịch vụ cung cấp đa dạng",
    description1: "Dễ dàng lựa chọn dịch vụ vệ sinh ngôi nhà của bạn",
    description2: "",
    image: image_banner_2,
  },
  {
    title: "Yêu cầu chi tiết",
    description1:
      "Có thể bổ sung các yêu cầu chi tiết hoặc các lưu ý đặc biệt. Tùy theo nhu cầu quý khách hàng",
    description2: "",
    image: image_banner_3,
  },
  {
    title: "Xác nhận nhanh chóng",
    description1:
      "Dịch vụ sẽ thông báo đến nhân viên ở khu vực gần bạn, để đảm bảo thời gian phục vụ nhanh nhất có thể",
    description2: "",
    image: image_banner_4,
  },
];

const AboutScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);
  const route = useRoute();
  const { previous } = route.params || {};

  consoleLog("previous", previous);

  const handleNext = async () => {
    if (currentIndex < dataSlider.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      swiperRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex === 2) {
      await setData(StorageNames.IS_OLD_USER, true);
      // navigation.reset({
      //   routes: [{ name: ScreenNames.HOME }],
      // });
      navigation.replace(previous || ScreenNames.LOGIN);
    }
  };

  return (
    <LayoutAbout>
      <CustomSwiper
        dataSlider={dataSlider}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        swiperRef={swiperRef}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNext}
          bgColor={themeColors.confirm}
          icon={() => <ArrowRight color={themeColors.lightBackground} />}
        >
          {currentIndex === 2 ? "Bắt đầu " : "Tiếp theo"}
        </Button>
      </View>
    </LayoutAbout>
  );
};
AboutScreen.propTypes = {
  navigation: PropTypes.object,
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
});
export default AboutScreen;
