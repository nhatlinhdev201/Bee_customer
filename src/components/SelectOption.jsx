import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { FormatMoney } from '../Utils/FormatMoney';
import { colors } from '../styles/Colors';
import Down from './svg/Down';
import MainStyles from '../styles/MainStyle';

const { height } = Dimensions.get('window');

const SelectOption = ({ data, onChange, value }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (data && data.length > 0 && !value) {
      onChange(data[0]);
    }
  }, [data]);

  const handleSelect = (item) => {
    onChange(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        disabled={!data || data.length === 0}
      >
        <View style={MainStyles.flexRowSpaceBetween}>
          <Text>
            {value ? `${value.OptionName}: ${FormatMoney(value.OptionePrice)} VND` : 'Chọn dịch vụ'}
          </Text>
          <Down fill='none' />
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        backdropOpacity={0.3}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.dragHandle} />
          {data && data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.OptionName}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>
                    {item?.OptionName}: {FormatMoney(item?.OptionePrice)} VND
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>Không có dữ liệu</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: height * 0.5,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
  },
  closeButton: {
    padding: 15,
    backgroundColor: "#F44336",
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SelectOption;
