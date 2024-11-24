import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
const ButtonResize = ({ bgColor, btnMargin = 8, textColor = 'white', fontSize = 20, fontWeight = 'normal', textMargin = 20, disable = false, paddingHorizontal = 25, paddingVertical = 12, icon: Icon, children = 'default', onPress, ...props }) => {
  const gradientColors = bgColor ? [bgColor, bgColor] : ['#4c669f', '#3b5998', '#192f6a'];

  return (
    <TouchableOpacity
      disabled={disable}
      {...props}
      style={({ pressed }) => [
        styles.button,
        { margin: btnMargin },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.gradientWrapper]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { paddingHorizontal, paddingVertical }]}
        >
          <View style={styles.content}>
            <Text style={{ ...styles.text, color: textColor, fontSize: fontSize, fontWeight: fontWeight, marginRight: textMargin }}>
              {children}
            </Text>
            {Icon && <Icon style={{ ...styles.icon }} />}
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
  gradientWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
  },
  text: {
    fontSize: 16,
  },
});

export default ButtonResize;
