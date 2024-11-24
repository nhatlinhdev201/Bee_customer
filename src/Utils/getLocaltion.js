import Geolocation from "@react-native-community/geolocation";
import { CheckOpenLocation } from "./CheckOpenLocation";
export const getLocation = async () => {
  const RESULTS = await CheckOpenLocation();
  return new Promise((resolve, reject) => {
    if (RESULTS === "granted") {
      Geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          } else {
            reject(new Error("No coordinates available"));
          }
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 25000, maximumAge: 10000 }
      );
    } else {
      reject(new Error("Location permission not granted"));
    }
  });
};
