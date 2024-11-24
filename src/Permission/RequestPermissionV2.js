import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { mainAction } from "../Redux/Action";
import { useDispatch } from "react-redux";

const RequestPermissionV2 = () => {
  const dispatch = useDispatch();

  const getAndroidPermissions = () => {
    const permissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    ];

    if (Platform.Version >= 33) {
      permissions.push(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      permissions.push(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
    } else {
      permissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
    permissions.push(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    return permissions;
  };

  const getIOSPermissions = () => [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.NOTIFICATIONS,
    PERMISSIONS.IOS.FACE_ID,
  ];

  const requestPermissions = async (permissions) => {
    try {
      const statuses = await requestMultiple(permissions);
      if (Platform.OS === "ios") {
        mainAction.checkPermissioniOS(statuses, dispatch);
      }
      console.log("Permission statuses:", statuses);
    } catch (error) {
      console.error("Error requesting permissions:", error);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestPermissions(getAndroidPermissions());
    } else if (Platform.OS === "ios") {
      requestPermissions(getIOSPermissions());
    }
  }, []);

  return <View />;
};

export default RequestPermissionV2;
