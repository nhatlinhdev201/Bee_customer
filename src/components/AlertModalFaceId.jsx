import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles/MainStyle";
import { colors } from "../styles/Colors";
import FastImage from "react-native-fast-image";
import { ic_face_id } from "../assets";
import { Button, Layout } from "@ui-kitten/components";
const AlertModalFaceId = ({
  isVisible = false,
  Header = "Thông báo",
  Title = "Vui lòng xác thực bằng gương mặt",
  styleHeader = {},
  styleTitle = {},
  LeftTitleButton = "Để sau",
  RightTitleButton = "Bật",
  onpressLeftButton = () => {},
  onpressRightButton = () => {},
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.8}
      backdropColor="black"
    >
      <View
        style={{
          paddingTop: SCREEN_HEIGHT * 0.05,
          width: SCREEN_WIDTH * 0.9,
          backgroundColor: "white",
          padding: 22,
          justifyContent: "center",
          // alignItems: "center",
          borderRadius: 10,
          borderColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <FastImage
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={ic_face_id}
        />
        <Text style={[styles.Header, styleHeader]}>{Header}</Text>
        <Text style={[styles.Title, styleTitle]}>{Title}</Text>
        <Layout style={styles.container} level="1">
          <View style={{ width: "50%" }}>
            <Button
              style={styles.button}
              appearance="ghost"
              status="danger"
              onPress={onpressLeftButton}
            >
              {LeftTitleButton}
            </Button>
          </View>
          <View style={{ width: "50%" }}>
            <Button
              style={styles.button}
              status="danger"
              onPress={onpressRightButton}
            >
              {RightTitleButton}
            </Button>
          </View>
        </Layout>
      </View>
    </Modal>
  );
};

export default AlertModalFaceId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 18,
  },
  Header: {
    fontSize: 15,
    fontWeight: "bold",
  },
  Title: {
    fontSize: 16,
    marginTop: 10,
  },
});
