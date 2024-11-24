import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import MainStyles from "../styles/MainStyle";
import FastImage from "react-native-fast-image";
import { ic_point, ic_premium } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPoint from "./AnimatedPoint";
import { themeColors } from "../styles/Colors";
import { Text } from "react-native";
import { consoleLog, GroupUserId } from "../Utils";
import { mainAction } from "../Redux";

const ShowPointComp = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.main.userLogin);
    const [rank, setRank] = useState("");

    useEffect(() => {
        OVG_spCustomer_Total_Point();
    }, []);

    const OVG_spCustomer_Total_Point = async () => {
        try {
            const pr = {
                CustomerId: userLogin?.Id,
                GroupUserId: GroupUserId,
            };

            const params = {
                Json: JSON.stringify(pr),
                func: "OVG_spCustomer_Total_Point",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            mainAction.userLogin({
                ...userLogin,
                TotalPoint: result[0]?.TotalPoint || 0,
                CustomerRank: result[0]?.CustomerRank || " Hạng đồng",
            }, dispatch);
            setRank(result[0]);
        } catch { }
    };

    return (
        <View style={[MainStyles.flexRowSpaceBetween]}>
            <View style={[MainStyles.flexRowCenter, {
                padding: 5,
                width: "50%",
                borderWidth: 1,
                borderTopColor: themeColors.textWhite,
                borderBottomColor: themeColors.textWhite,
                borderLeftColor: themeColors.textWhite,
                borderRightColor: themeColors.textYellow,
                paddingLeft: 10,
                borderTopStartRadius: 10,
                borderBottomStartRadius: 10,
                backgroundColor: themeColors.lightBackground,
            }]}>
                <View style={MainStyles.flexRow}>
                    <FastImage
                        source={ic_point}
                        style={{
                            width: 18,
                            height: 18,
                            resizeMode: "contain",
                            marginRight: 5,
                            marginVertical: 5
                        }}
                    />
                    <AnimatedPoint value={rank?.TotalPoint || 0} />
                </View>
            </View>
            <View style={[MainStyles.flexRowCenter, {
                padding: 5,
                width: "50%",
                borderWidth: 1,
                borderColor: themeColors.textWhite,
                paddingLeft: 10,
                borderTopEndRadius: 10,
                borderBottomEndRadius: 10,
                backgroundColor: themeColors.lightBackground,
            }]}>
                <View style={MainStyles.flexRow}>
                    <FastImage
                        source={ic_premium}
                        style={{
                            width: 18,
                            height: 18,
                            resizeMode: "contain",
                            marginRight: 5,
                            marginVertical: 5
                        }}
                    />
                    <Text style={{ color: themeColors.textYellow }}>
                        {rank?.CustomerRank || "Hạng đồng"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export const ShowPoint = memo(ShowPointComp);
