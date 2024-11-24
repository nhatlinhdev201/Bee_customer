import { memo } from "react"
import { Text } from "react-native"
import { View } from "react-native"
import MainStyles from "../../styles/MainStyle"
import { colors } from "../../styles/Colors"
import { ic_point, ic_premium } from "../../assets"
import FastImage from "react-native-fast-image"
import { useSelector } from "react-redux"

const RankPointComp = () => {
    const userLogin = useSelector((state) => state.main.userLogin);
    const customerId = useSelector((state) => state.main.customerId);

    return (
        <View style={[MainStyles.card, {marginVertical: 15}]}>
            {customerId ? (
                <>
                    <View style={[MainStyles.flexRowCenter]}>
                        <Text style={[MainStyles.title1, { textAlign: "center", width: "100%" }]}> Xin chào {userLogin?.CustomerName} 👋</Text>
                    </View>
                    <View style={[MainStyles.flexRowCenter]}>
                        <Text style={[{ textAlign: "center", width: "100%", fontSize:12, fontWeight: "300"}]}> Điểm tích lũy hiện tại</Text>
                    </View>
                </>
            ) : (
                <View style={[MainStyles.flexRowCenter]}>
                    <Text style={[MainStyles.title1, { textAlign: "center", width: "100%" }]}> Ong Vàng xin chào 👋</Text>
                </View>
            )}
            <View style={[
                MainStyles.flexRowSpaceBetween,
                {
                    marginTop: 10,
                }
            ]}>
                <View style={[
                    MainStyles.flexRowCenter,
                    {
                        padding: 5,
                        width: "50%",
                        borderWidth: 1,
                        borderColor: colors.GRAY,
                        paddingLeft: 10,
                        borderTopStartRadius: 10,
                        borderBottomStartRadius: 10
                    }
                ]}>
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
                        <Text
                            style={[
                                {
                                    color: colors.Orange[600],
                                },
                            ]}
                        >
                            300.000 điểm
                        </Text>
                    </View>
                </View>
                <View style={[
                    MainStyles.flexRowCenter,
                    {
                        padding: 5,
                        width: "50%",
                        borderWidth: 1,
                        borderColor: colors.GRAY,
                        paddingLeft: 10,
                        borderTopEndRadius: 10,
                        borderBottomEndRadius: 10
                    }
                ]}>
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
                        <Text
                            style={[
                                {
                                    color: colors.Orange[600],
                                },
                            ]}
                        >
                            Hạng đồng
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const RankPoint = memo(RankPointComp)