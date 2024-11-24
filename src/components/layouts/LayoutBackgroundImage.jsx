import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { bg_bg1, bg_bg2, bg_bg3, bg_bg4 } from '../../assets';

const LayoutBackgroundImage = ({ source = bg_bg4, children, overlayColor = 'rgba(0, 0, 0, 0.5)' }) => {
    return (
        <ImageBackground source={source} style={styles.backgroundImage}>
            <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
            <View style={styles.content}>
                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Để hình ảnh bao phủ toàn bộ màn hình
    },
    overlay: {
        // ...StyleSheet.absoluteFillObject, // Để lớp phủ phủ toàn màn hình
        // backgroundColor: 'rgba(255, 255, 255, 255)', // Mặc định màu overlay là nửa trong suốt đen
    },
    content: {
        flex: 1,
    },
});

export default LayoutBackgroundImage;
