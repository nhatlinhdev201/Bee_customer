import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import { colors } from '../styles/Colors';

const InputNumber = ({
  style,
  bgColor = '#FFFFFF',
  textColor = '#000000',
  min = 0,
  max = 100,
  value,
  setFieldValue = () => { },
  setField = () => { },
  fieldName,
  disable = false,
  ...props }) => {
  const handleIncrease = () => {
    setFieldValue(fieldName, parseInt(value, 10) + 1);
    setField(parseInt(value, 10) + 1);
  };

  const handleDecrease = () => {
    setFieldValue(fieldName, parseInt(value, 10) > min ? parseInt(value, 10) - 1 : min);
    setField(parseInt(value, 10) > min ? parseInt(value, 10) - 1 : min);
  };

  const handleChange = (text) => {
    // Chỉ cho phép nhập số và không quá min và max
    const numericValue = text.replace(/[^0-9]/g, '');  // Chỉ cho phép nhập số
    const numericParsed = parseInt(numericValue, 10);

    if (numericValue === '') {
      // Khi người dùng xóa hết thì mặc định là 0
      setFieldValue(fieldName, 0);
    } else if (!isNaN(numericParsed) && numericParsed >= min && numericParsed <= max) {
      // Kiểm tra rằng giá trị là số hợp lệ và nằm trong phạm vi min-max
      setFieldValue(fieldName, numericParsed);
    } else if (numericParsed > max) {
      // Đảm bảo không vượt quá giá trị max
      setFieldValue(fieldName, max);
    }
  };


  return (
    <View style={[styles.container, style]}>
      <Input
        style={[styles.input, { backgroundColor: bgColor, color: textColor }]}
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={String(value)}
        onChangeText={handleChange}
        {...props}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDecrease}>
          <Icon
            name='minus-outline'
            fill={value > min ? colors.MAIN_BLUE_CLIENT : '#A0A0A0'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleIncrease}>
          <Icon
            name='plus-outline'
            fill={value < max ? colors.MAIN_BLUE_CLIENT : '#A0A0A0'}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 5,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default InputNumber;
