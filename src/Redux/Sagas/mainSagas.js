import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import mainTypes from "../Action/mainTypes";
import {
  api,
  APIKey,
  API_END_POINT,
  API_DECRYPTSTRING,
} from "../../Config/Api";
import messaging from "@react-native-firebase/messaging";
export function* API_spCallServer(action) {
  const params = action && action.params;

  try {
    if (!params) {
      throw new Error("Missing parameters.");
    }

    params.API_key = APIKey;
    yield delay(300);

    // Call API
    const FuncApi = "API_spCallServer";
    const url = `${API_END_POINT}/ApiMain/API_spCallServer/${FuncApi}`;
    const response = yield api.post(url, params);

    // Check API call success
    if (response && response.status === 200) {
      if (response.data === "") {
        action.resolve([]);
      } else {
        action.resolve(JSON.parse(response.data));
      }
    } else {
      action.reject(response);
    }
  } catch (error) {
    action.reject(error);
    yield delay(600);
    action.resolve(false);
  }
}

export function* checkPermission(action) {
  try {
    const authStatus = yield messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const token = yield messaging().getToken();
      if (token) {
        // yield setData(StorageNames.DEVICES_TOKEN, JSON.stringify(token));
        action.resolve(token);
      }
    }
  } catch (e) {
    yield delay(300);
    action.reject(e);
  }
}

export function* API_spCallPostImage(action) {
  try {
    const params = action && action.params;

    let respone = yield api.post(
      "https://api-crmcak.vps.vn/api/ApiMain/API_spCallPostImage_TimeKeeping",
      params
    );
    if (respone && respone.status === 201) {
      respone.data == {}
        ? action.resolve([])
        : action.resolve(JSON.parse(respone.data.Message));
    } else {
      action.reject(respone);
    }
  } catch (e) {
    action.reject(e);
  }
}

export function* DecryptString(action) {
  try {
    const params = action.params; // Directly use params if it's a JSON object
    yield delay(300);
    const response = yield api.post(API_DECRYPTSTRING, params);

    if (response && response.status === 200) {
      action.resolve(response.data || "");
    } else {
      action.reject(response);
    }
  } catch (e) {
    console.log("-----> 💀💀💀💀💀💀💀💀💀 <-----  e:", e);
    action.reject(e);
  }
}

export function* cameraScan() {
  yield put({ type: mainTypes.LOADING, payload: true });
  yield delay(300);
}

export default function* watchMainSagas() {
  yield takeEvery(mainTypes.CallServer, API_spCallServer);
  yield takeEvery(mainTypes.PostImage, API_spCallPostImage);
  yield takeLatest(mainTypes.CHECK_PERMISSION, checkPermission);
  yield takeEvery(mainTypes.DecryptString, DecryptString);
}
