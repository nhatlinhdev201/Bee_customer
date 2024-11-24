import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { themeColors } from '../../styles/Colors';
import MainStyles from '../../styles/MainStyle';
import CustomFormError from '../forms/CustomFormError';

const LocationDetailModalComp = ({
  isVisible,
  onClose,
  setLocationDetail = () => { },
  locationDetail,
  onConfirm = () => { },
}) => {
  const [locationType, setLocationType] = useState('Nhà ở');
  const [houseNumber, setHouseNumber] = useState('');
  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (isVisible) {
  //     setHouseNumber(''); // Reset house number when modal opens
  //     setLocationType('Nhà ở'); // Set default location type
  //     setTimeout(() => {
  //       inputRef.current.focus(); // Focus on input after modal is visible
  //     }, 100);
  //   }
  // }, [isVisible]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContent}
      >
        <Text style={styles.title}>Nhập thông tin vị trí</Text>

        <Text style={styles.label}>Loại địa chỉ</Text>
        <View style={styles.buttonGroup}>
          {['Nhà ở', 'Văn phòng'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                locationDetail?.locationType === type && styles.selectedButton,
              ]}
              onPress={() => setLocationDetail((prev) => ({ ...prev, locationType: type }))}
              accessibilityLabel={`Chọn ${type}`}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Số nhà</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Nhập số nhà"
          value={locationDetail?.houseNumber}
          onChangeText={(text) => setLocationDetail((prev) => ({ ...prev, houseNumber: text }))}
          // keyboardType="numeric"
          accessibilityLabel="Nhập số nhà"
        />
        <CustomFormError>
          {locationDetail?.houseNumber === "" ? "Vui lòng thêm số nhà" : ""}
        </CustomFormError>
        <TouchableOpacity
          disabled={locationDetail?.houseNumber === ""}
          style={[styles.confirmButton, { opacity: locationDetail?.houseNumber === "" ? 0.5 : 1 }]}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: themeColors.textMain,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    ...MainStyles.labelTitle
  },
  buttonGroup: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: themeColors.confirm,
  },
  buttonText: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: themeColors.confirm,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export const LocationDetailModal = memo(LocationDetailModalComp);
