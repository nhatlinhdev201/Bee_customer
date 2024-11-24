import React, { memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { bee_loading } from '../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import Box from './Box';
import { Spinner } from '@ui-kitten/components';

const SpinerLoadingComp = () => {
    return (
        <View style={styles.container}>
            <Spinner size='large'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    gif: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_HEIGHT * 0.3,
    },
});

export const SpinerLoading = memo(SpinerLoadingComp);