import { Alert, Linking } from "react-native";

export const openGoogleMapsDirections = (startLat, startLng, endLat, endLng) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}`;

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert("Không thể mở Google Maps", "Vui lòng kiểm tra lại.");
            }
        })
        .catch((err) => console.error("Lỗi khi mở URL", err));
};

export const openGoogleMapsDirectionsWithName = (startLat, startLng, startName, endLat, endLng, endName) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng} (${startName})&destination=${endLat},${endLng} (${endName})`;

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert("Không thể mở Google Maps", "Vui lòng kiểm tra lại.");
            }
        })
        .catch((err) => console.error("Lỗi khi mở URL", err));
};

export const openGoogleMapsApp = (latitude, longitude) => {
    const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert("Không thể mở Google Maps app", "Vui lòng kiểm tra lại.");
            }
        })
        .catch((err) => console.error("Lỗi khi mở URL", err));
};

export const openGoogleMapsWithLocation = (latitude, longitude, placeName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}(${placeName})`;

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                Alert.alert("Không thể mở Google Maps", "Vui lòng kiểm tra lại.");
            }
        })
        .catch((err) => console.error("Lỗi khi mở URL", err));
};