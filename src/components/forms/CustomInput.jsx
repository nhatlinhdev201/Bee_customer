import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import { colors } from '../../styles/Colors';

const CustomInput = ({ style, bgColor = '#FFFFFF', textColor = '#000000', type = 'text', showPasswordToggle = false, borderColor, value = '', ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <Input
        style={[styles.input, { backgroundColor: bgColor, color: textColor, borderColor: borderColor || '#E0E0E0' }]}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={type === 'password' && !isPasswordVisible}
        autoCorrect={false}
        spellCheck={false}
        value={value}
        {...props}
      />
      {(type === 'password' && showPasswordToggle && value) && (
        <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            fill={colors.MAIN_BLUE_CLIENT}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  iconStyle: {
    width: 28,
    height: 28,
  },
});

export default CustomInput;
