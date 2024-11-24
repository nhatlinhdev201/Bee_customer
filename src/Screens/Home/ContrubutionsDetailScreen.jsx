import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import LayoutGradientBlue from "../../components/layouts/LayoutGradientBlue";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { banner_service } from "../../assets";
import MainStyles, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/MainStyle";
import LayoutBottom from "../../components/layouts/LayoutBottom";
import { Icon } from "@ui-kitten/components";
import { colors, themeColors } from "../../styles/Colors";
import Box from "../../components/Box";
import { Header } from "../../components/HeaderComp";

const ContrubutionsDetailScreen = () => {
  return (
    <LayoutGradientBlue>
      <Header headerTitle="Dịch vụ Quảng bá Thương hiệu" />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image
            source={banner_service}
            style={{ width: SCREEN_WIDTH, height: 210 }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subtitle}>
            {`"Khám phá cơ hội hợp tác và quảng bá thương hiệu của bạn trên ứng dụng Ong Vàng ngay hôm nay!"`}
          </Text>
          <View style={styles.divider} />
          <View style={MainStyles.flexRowFlexStart}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  textAlign: "center",
                  marginBottom: 15,
                  color: colors.MAIN_BLUE_CLIENT,
                },
              ]}
            >
              Giới thiệu Dịch vụ Quảng bá Thương hiệu trên Ứng dụng Ong Vàng
            </Text>
          </View>
          <Text style={styles.paragraph}>Quý Đối tác Kính mến,</Text>
          <Text style={[styles.paragraph]}>
            Chúng tôi rất vui mừng giới thiệu dịch vụ Quảng bá Thương hiệu trên
            ứng dụng Ong Vàng – giải pháp tối ưu giúp quý đối tác doanh nghiệp
            dễ dàng tiếp cận và kết nối với hàng ngàn người dùng của chúng tôi.
          </Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Dịch vụ Quảng bá Thương hiệu
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Tại Ong Vàng, chúng tôi cung cấp các banner quảng cáo chiến lược
            trên ứng dụng của mình, giúp quý đối tác doanh nghiệp tăng cường sự
            hiện diện thương hiệu và quảng bá sản phẩm, dịch vụ một cách hiệu
            quả. Dưới đây là những lợi ích mà dịch vụ quảng bá của chúng tôi
            mang lại:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>
              1. Tiếp Cận Đối Tượng Khách Hàng Rộng Rãi
            </Text>
            <Text style={styles.paragraph}>
              Ứng dụng Ong Vàng với hàng ngàn người dùng thường xuyên sẽ giúp
              thương hiệu của quý đối tác được nhìn thấy bởi nhiều khách hàng
              tiềm năng.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>2. Hiệu Quả Tương Tác Cao</Text>
            <Text style={styles.paragraph}>
              Banner quảng cáo được thiết kế đẹp mắt, đặt tại vị trí chiến lược
              trên ứng dụng, thu hút sự chú ý và tương tác từ người dùng.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>3. Kết Nối Trực Tiếp</Text>
            <Text style={styles.paragraph}>
              Khách hàng có thể dễ dàng nhấp vào banner để tìm hiểu thêm về sản
              phẩm, dịch vụ của quý đối tác, và liên hệ trực tiếp để đặt mua
              hoặc sử dụng dịch vụ.
            </Text>
          </View>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Đối Tác Kết Nối Cung Cấp Dịch Vụ Mua Bán Đồ Gia Dụng
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Ngoài việc quảng bá thương hiệu, Ong Vàng còn hỗ trợ các doanh
            nghiệp kết nối cung cấp dịch vụ mua bán đồ gia dụng. Nếu quý đối tác
            kinh doanh các sản phẩm gia dụng và muốn mở rộng thị trường, đây là
            cơ hội tuyệt vời để tiếp cận khách hàng thông qua nền tảng của chúng
            tôi.
          </Text>
          <View style={MainStyles.flexRowFlexStart}>
            <Text style={styles.sectionTitle}>
              Liên Hệ Trực Tiếp Với Tổng Đài Viên
            </Text>
          </View>
          <Text style={styles.paragraph}>
            Để tìm hiểu thêm chi tiết về dịch vụ và các gói quảng cáo, quý đối
            tác vui lòng liên hệ trực tiếp với tổng đài viên của chúng tôi:
          </Text>
        </View>
        <Box height={SCREEN_HEIGHT * 0.07} />
      </ScrollView>
      <LayoutBottom>
        <TouchableOpacity
          style={[styles.button, MainStyles.flexRowCenter]}
          onPress={() => {
            Linking.openURL(`tel:${"0922277782"}`);
          }}
        >
          <Icon
            style={MainStyles.CardIcon}
            fill="#FFFFFF"
            name="phone-outline"
          />
          <Text style={styles.buttonText}>Liên hệ ngay</Text>
        </TouchableOpacity>
      </LayoutBottom>
    </LayoutGradientBlue>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF9900",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  divider: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // marginTop: 16,
    // marginBottom: 8,
    color: "#FF9900",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.BLACK,
    marginBottom: 8,
    textAlign: "justify",
  },
  listItem: {
    marginBottom: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9900",
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FF9900",
    marginBottom: 8,
  },
  signature: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 8,
    color: "#666",
  },
  button: {
    marginTop: 16,
    backgroundColor: themeColors.confirm,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    paddingLeft: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContrubutionsDetailScreen;
