import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from "./googleApiKey";

// Khởi tạo Geocoder với API key của Google Maps
Geocoder.init(GOOGLE_API_KEY);

const getAddressFromCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        if (position.coords) {
          const { latitude, longitude } = position.coords;
          try {
            const response = await Geocoder.from(latitude, longitude);
            if (response.results.length > 0) {
              const address = response.results[0].formatted_address;
              resolve({
                latitude: latitude,
                longitude: longitude,
                address: address,
              });
            } else {
              resolve({
                latitude: latitude,
                longitude: longitude,
                address: address,
              });
            }
          } catch (error) {
            resolve({
              latitude: latitude,
              longitude: longitude,
              address: address,
            });
          }
        } else {
          resolve({
            coordinates: null,
            address: "Không thể lấy tọa độ vị trí.",
          });
        }
      },
      (error) => {
        resolve({
          coordinates: null,
          address: "Có lỗi xảy ra khi lấy vị trí.",
        });
      },
      { enableHighAccuracy: false, timeout: 20000 }
    );
  });
};

export default getAddressFromCurrentLocation;
