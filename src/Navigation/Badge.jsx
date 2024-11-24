import React, { memo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { themeColors } from '../styles/Colors';

const BadgeComp = ({ count, isNew = true }) => {
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isNew) {
      // Tạo hiệu ứng rung lắc liên tục
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 } 
      ).start();
    } else {
      animation.setValue(1); 
    }

    return () => {
    //   animation.stop();
    };
  }, [isNew]);

  if (!count) return null;

  return (
    <Animated.View style={[styles.badgeContainer, { transform: [{ scale: animation }] }]}>
      <Text style={styles.badgeText}>{count}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -5,
    top: -1,
    backgroundColor: themeColors.textYellow,
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export const Badge = memo(BadgeComp);
