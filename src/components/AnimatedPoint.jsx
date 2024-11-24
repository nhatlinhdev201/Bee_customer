import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { themeColors } from "../styles/Colors";
import { consoleLog, FormatMoney } from "../Utils";

const AnimatedPoint = ({ value = 0, duration = 1000, style }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (value >= 0) {
            animatePoints(0, value);
        }
    }, [value]);

    const animatePoints = (startValue, endValue) => {
        animatedValue.setValue(startValue);
        Animated.timing(animatedValue, {
            toValue: endValue,
            duration: duration,
            useNativeDriver: false,
        }).start();
    };

    // Cập nhật giá trị hiển thị
    animatedValue.addListener(({ value }) => {
        setDisplayValue(Math.round(value)); // Làm tròn giá trị để hiển thị
    });

    return (
        <View style={style}>
            <Text style={{ color: themeColors.textYellow }}>
                {FormatMoney(displayValue)} điểm
            </Text>
        </View>
    );
};

export default AnimatedPoint;
