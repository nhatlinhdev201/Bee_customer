import React from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { colors } from '../styles/Colors';

const TextArea = ({ label, style = {}, ...props }) => {
  return (
    <Input
      label={label}
      multiline={true}
      textStyle={[{ minHeight: 100, textAlignVertical: 'top' }, style]}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
});

export default TextArea;
