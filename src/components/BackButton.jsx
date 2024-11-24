import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from "./svg/ArrowLeft";
import { colors } from "../styles/Colors";
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const BackButton = ({ title, showBackButton = true, onBack = () => { }, color = colors.WHITE, showHomeButton = false, onHomeBtnPress = () => { } }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    onBack();
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack} style={{ width: SCREEN_WIDTH * 0.2 }}>
          <ArrowLeft color={color} size={28} />
        </TouchableOpacity>
      )}
      <Text>{title}</Text>
      {/* {showBackButton && (
        <TouchableOpacity onPress={handleGoBack} style={{ width: SCREEN_WIDTH * 0.2 }}>
          <ArrowLeft color={color} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    zIndex: 999,
  },
});

export default BackButton;
