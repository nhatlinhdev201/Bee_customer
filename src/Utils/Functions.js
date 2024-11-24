import { useNavigation } from "@react-navigation/native";
import { ScreenNames, StorageNames } from "../Constants";
import { AlertToaster } from "./AlertToaster";
import { removeData } from "./localStore";
import { mainAction } from "../Redux";
import { useDispatch } from "react-redux";

export const consoleLog = (title = '', message) => {
    console.log(`------------${title}-----------`, message);
}

export const prints = (title = 'log', text) => {
    return console.log(`------------${title}------------`, JSON.stringify(text, null, 2));
};

export const handleLogout = async (navi, dispatch, loading, setLoading) => {
    try {
        await removeData(StorageNames.LOCATION);
        await removeData(StorageNames.CUSTOMER_ID);
        await removeData(StorageNames.SERVICE_CONFIRM);
        mainAction.userLogin(null, dispatch);
        navi.reset({
            routes: [{ name: ScreenNames.LOGIN }],
        });
    } catch {
        AlertToaster("error", "Lỗi! Liên hệ IT");
    }
}