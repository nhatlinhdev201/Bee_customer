import React, { memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { bee_loading } from '../assets';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import Box from './Box';

const BeeLoadingComp = () => {
    return (
        <View style={styles.container}>
            <View>
                <FastImage
                    style={styles.gif}
                    source={bee_loading}
                    resizeMode={FastImage.resizeMode.contain}
                />
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                <Box height={SCREEN_HEIGHT * 0.2} />
            </View>
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

export const BeeLoading = memo(BeeLoadingComp);