import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const ServiceSelection = () => {
  // Dữ liệu dịch vụ

  const serviceData = [
    {
      ServiceId: 12,
      OptionName: "Điện gia đình",
      OptionPrice: 150000,
      Id: 7,
      Detail: [
        { Id: 70, Price: 150000, Name: "Dây điện", init: "Mét" },
        { Id: 71, Price: 10000, Name: "Ổ cắm", init: "Cái" },
        { Id: 72, Price: 12000, Name: "Cầu chì", init: "Cái" },
      ],
    },
    {
      ServiceId: 13,
      OptionName: "Điện công nghiệp",
      OptionPrice: 300000,
      Id: 8,
      Detail: [
        { Id: 73, Price: 200000, Name: "Công tắc", init: "Cái" },
        { Id: 74, Price: 25000, Name: "Đèn", init: "Cái" },
        { Id: 75, Price: 30000, Name: "Quạt", init: "Cái" },
      ],
    },
    {
      ServiceId: 14,
      OptionName: "Điện máy",
      OptionPrice: 100000,
      Id: 9,
      Detail: [
        { Id: 76, Price: 120000, Name: "Máy lạnh", init: "Cái" },
        { Id: 77, Price: 150000, Name: "Tủ lạnh", init: "Cái" },
      ],
    },
  ];

  const [details, setDetails] = useState({}); // Lưu lựa chọn chi tiết của người dùng

  const handleDetailSelect = (optionId, detail) => {
    setDetails((prev) => {
      const newDetails = { ...prev };
      if (!newDetails[optionId]) {
        newDetails[optionId] = {};
      }
      if (newDetails[optionId][detail.Id]) {
        delete newDetails[optionId][detail.Id]; // Nếu đã chọn thì xóa
      } else {
        newDetails[optionId][detail.Id] = { ...detail, quantity: 1 }; // Thêm detail với số lượng 1
      }
      return newDetails;
    });
  };

  const handleQuantityChange = (optionId, detailId, quantity) => {
    setDetails((prev) => ({
      ...prev,
      [optionId]: {
        ...prev[optionId],
        [detailId]: { ...prev[optionId][detailId], quantity: Math.max(0, quantity) || 0 },
      },
    }));
  };

  const handleDetailRemove = (optionId, detailId) => {
    setDetails((prev) => {
      const newDetails = { ...prev };
      delete newDetails[optionId][detailId]; // Xóa detail
      return newDetails;
    });
  };

  const handleLogSelection = () => {
    console.log('Thông tin người dùng đã chọn:', details);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Dịch Vụ</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionContainer}>
        {serviceData.map((service) => (
          <TouchableOpacity
            key={service.Id}
            style={styles.option}
          >
            <Text style={styles.optionText}>{service.OptionName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.detailsContainer}>
        {serviceData.map(option => (
          <View key={option.Id}>
            <Text style={styles.detailTitle}>{option.OptionName}</Text>
            {option.Detail.map((detail) => (
              <View key={detail.Id} style={styles.detailItem}>
                <TouchableOpacity onPress={() => handleDetailSelect(option.Id, detail)} style={styles.detailButton}>
                  <Text style={styles.detailName}>{detail.Name} ({detail.init})</Text>
                </TouchableOpacity>
                {details[option.Id] && details[option.Id][detail.Id] && (
                  <>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="Nhập số lượng"
                      value={details[option.Id][detail.Id].quantity?.toString()}
                      onChangeText={(text) => handleQuantityChange(option.Id, detail.Id, parseInt(text))}
                      onEndEditing={handleLogSelection}
                    />
                    <Text style={styles.price}>{detail.Price.toLocaleString()} VNĐ</Text>
                    <TouchableOpacity onPress={() => handleDetailRemove(option.Id, detail.Id)} style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>Xóa</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    maxHeight: 80,
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailButton: {
    flex: 1,
  },
  detailName: {
    fontSize: 16,
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#ff5252',
    borderRadius: 5,
    padding: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default ServiceSelection;
