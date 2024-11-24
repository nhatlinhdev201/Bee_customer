import React from 'react';
import { Text } from 'react-native';
import {themeColors} from "../../styles/Colors";

const CustomLabel = ({ children }) => {
    return (
        <Text style={{
            fontWeight: 'bold',
            marginBottom: 5,
            color: themeColors.textMain,
            fontSize: 15,
        }}>
            {children}
        </Text>
    );
};

export default CustomLabel;
