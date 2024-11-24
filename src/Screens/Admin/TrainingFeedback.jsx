import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { colors } from "../../styles/Colors";

export const TrainingFeedback = () => {
  const [link, setLink] = useState("");
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const linkNew =
      "https://crm.cak-solution.com/ovg/home?username=0943214795&password=123456";
    setLink(linkNew);
  };
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: link }}
        onError={(event) => alert(`Lỗi ${event.nativeEvent.title}`)}
        style={{
          marginTop: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
