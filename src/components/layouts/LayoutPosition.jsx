import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LayoutPosition = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    justifyContent: 'center',
  }
});

export default LayoutPosition;
