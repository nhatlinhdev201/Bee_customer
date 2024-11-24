import { StorageNames } from "../Constants";
import { getData } from "./localStore";

export const GetUserProfile = async () => {
  try {
    const profile = await getData(StorageNames.USER_PROFILE);
    if (profile) {
      return profile;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
