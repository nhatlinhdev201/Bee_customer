import React, { memo, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Button, TextInput, Platform } from "react-native";
import { themeColors } from "../../styles/Colors";
import MainStyles from "../../styles/MainStyle";
import { ic_coin } from "../../assets";
import { FormatMoney, prints } from "../../Utils";
import { Icon } from "@ui-kitten/components";
import CustomLabel from "../forms/CustomLabel";
import InputNumber from "../InputNumber";
import TextArea from "../TextArea";
import Box from "../Box";
import { KeyboardAvoidingView } from "react-native";


const LayoutServiceComp = ({
    Service = {},
    optionCounts = {},
    setOptionCounts = () => { },
    notes = "",
    setNotes = () => { },
    people = 1,
    setPeople = () => { },
}) => {
    const [selectedDetail, setSelectedDetail] = useState(Service?.ServiceDetails[0]);

    const handleCountChange = (option, delta) => {
        let optionId = option.OptionId;
        setOptionCounts(prev => {
            const currentCount = prev[optionId]?.TotalOption || 0;
            const newCount = Math.max(0, currentCount + delta);
            let detail = {
                DetailId: selectedDetail?.DetailId,
                DetailName: selectedDetail?.DetailName,
                DetailPrice: selectedDetail?.DetailPrice,
                OptionId: optionId,
                OptionName: option?.OptionName,
                OptionPrice: option?.OptionPrice,
                TotalOption: newCount,
                Unit: option?.Unit
            }
            return { ...prev, [optionId]: detail };
        });
    };
    const renderOptionCard = (option) => {
        return (
            <View style={styles.optionCard} key={option.OptionId}>
                {/* <Image source={{ uri: option.OptionImage }} style={styles.optionImage} /> */}
                {
                    optionCounts[option.OptionId]?.TotalOption > 0 ? (
                        <View style={styles.optionInfo}>
                            <View style={MainStyles.flexRowSpaceBetween}>
                                <Text style={styles.optionName} numberOfLines={2}>{option.OptionName}</Text>
                                <Icon
                                    style={MainStyles.CardIcon}
                                    fill={themeColors.success}
                                    name="done-all-outline"
                                />
                            </View>
                            <View style={MainStyles.flexRowSpaceBetween}>
                                <View
                                    style={[
                                        MainStyles.flexRowFlexStartAlignCenter,
                                    ]}
                                >
                                    <Image source={ic_coin} style={{ width: 20, height: 20 }} />
                                    <Text
                                        style={{
                                            color: themeColors.textYellow,
                                            marginLeft: 10,
                                            fontSize: 17,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {FormatMoney(((optionCounts[option.OptionId]?.TotalOption || 1) * option.OptionPrice) || 0)} VND
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: themeColors.textYellow,
                                        marginLeft: 10,
                                        fontSize: 17,
                                        fontWeight: "700",
                                    }}
                                >
                                    {optionCounts[option.OptionId]?.TotalOption?.toString() || '0'} {option.Unit}
                                </Text>
                            </View>
                            <View style={MainStyles.flexRowCenter}>
                                <View style={styles.optionQuantity}>
                                    <TouchableOpacity onPress={() => handleCountChange(option, -1)} style={styles.button}>
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityInput}
                                        value={optionCounts[option.OptionId]?.TotalOption?.toString() || '0'}
                                        keyboardType="numeric"
                                        editable={false}
                                    />
                                    <TouchableOpacity onPress={() => handleCountChange(option, 1)} style={styles.button}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.optionInfo}>
                            <TouchableOpacity
                                style={[MainStyles.flexRowSpaceBetween]}
                                onPress={() => handleCountChange(option, 1)}
                            >
                                <Text style={styles.optionName} numberOfLines={2}>{option.OptionName}</Text>
                                <Icon
                                    style={MainStyles.CardIcon}
                                    fill={themeColors.textMain}
                                    name="plus-outline"
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View >
        );
    };

    const renderDetailTabs = () => {
        return (
            <ScrollView
                horizontal
                style={styles.tabContainer}
                showsHorizontalScrollIndicator={false}
            >
                {Service?.ServiceDetails.map((detail) => (
                    <TouchableOpacity
                        key={detail.DetailId}
                        style={[styles.tabButton, detail.DetailId === selectedDetail.DetailId && styles.activeTab]}
                        onPress={() => setSelectedDetail(detail)}>
                        <Text style={[styles.tabText, detail.DetailId === selectedDetail.DetailId && styles.activeTabText]}>{detail.DetailName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    // const renderServiceDetail = () => {
    //     return (
    //         <FlatList
    //             data={selectedDetail.ServiceOptions}
    //             keyExtractor={item => item?.OptionId.toString()}
    //             renderItem={({ item }) => renderOptionCard(item)}
    //             contentContainerStyle={styles.optionList}
    //         />
    //     );
    // };
    const renderServiceDetail = () => {
        return (
            <View style={styles.optionList}>
                {selectedDetail.ServiceOptions.map(item => (
                    <View key={item?.OptionId.toString()}>
                        {renderOptionCard(item)}
                    </View>
                ))}
            </View>
        );
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    {renderDetailTabs()}
                    <View>
                        <CustomLabel>Số lượng nhân viên</CustomLabel>
                        <InputNumber
                            value={people}
                            setFieldValue={(fieldName, value) => {
                                if (fieldName === 'people') {
                                    setPeople(value);
                                }
                            }}
                            setField={setPeople}
                            fieldName="people"
                            min={1}
                        />
                        <Box height={15} />
                        <CustomLabel>Loại thiết bị - dụng cụ</CustomLabel>
                        {renderServiceDetail()}
                        <CustomLabel>Ghi chú</CustomLabel>
                        <TextArea
                            placeholder="Thêm lưu ý cho dịch vụ hoặc các dụng cụ cần thiết khác"
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        backgroundColor: themeColors.background_light,
        backgroundImage: 'linear-gradient(135deg, #FFD900 0%, #ffde59 100%)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: themeColors.textMain,
        textAlign: 'center',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 10,
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: '500',
        color: themeColors.textMain,
        textAlign: 'center',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 10,
    },
    imageService: {
        width: '100%',
        height: 170,
        borderRadius: 10,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10,
    },
    icon: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabButton: {
        marginRight: 15,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    activeTab: {
        backgroundColor: themeColors.confirm,
    },
    tabText: {
        fontSize: 16,
        color: themeColors.textBlack,
    },
    activeTabText: {
        color: themeColors.textMain,
        fontWeight: '500',
    },
    optionList: {
        paddingBottom: 20,
        paddingHorizontal: 2,
    },
    optionCard: {
        backgroundColor: themeColors.background,
        borderRadius: 5,
        // padding: 15,
        marginTop: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    optionInfo: {
        padding: 10
    },
    optionImage: {
        width: '100%',
        height: 170,
        borderRadius: 10,
        resizeMode: 'cover',
        borderWidth: 2,
        // marginTop: 10,
    },
    optionName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: themeColors.textMain,
    },
    optionQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: themeColors.confirm,
        padding: 5,
        minWidth: 35,
        borderRadius: 8,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: themeColors.textMain,
        fontSize: 18,
        fontWeight: '700',
    },
    quantityInput: {
        minWidth: 100,
        textAlign: 'center',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        color: themeColors.confirm,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        fontWeight: '500',
    }
});


export const LayoutService = memo(LayoutServiceComp)