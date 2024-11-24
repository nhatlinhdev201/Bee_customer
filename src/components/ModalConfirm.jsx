import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MainStyles from '../styles/MainStyle';
import AlertModal from './AlertModal';

const ModalConfirm = ({
  title,
  isModalVisible,
  setModalVisible,
  onConfirm,
  modalTitle = 'Thông báo',
  btnConfirmTiTle = 'Xác nhận',
  backdropClose = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    setModalVisible(false);
  };

  return (
    <AlertModal
      isVisible={isModalVisible}
      onClose={() => setModalVisible(false)}
      isAuto={false}
      onConfirm={handleConfirm}
      title={modalTitle}
      backdropCloseable={backdropClose}
      isCancelable={false}
      btnConfirmTiTle={btnConfirmTiTle}
    >
      <View>
        <View style={[MainStyles.cardJob]}>
          <View style={MainStyles.flexRowCenter}>
            <View style={MainStyles.line} />
          </View>
          <View style={MainStyles.flexRowCenter}>
            <Text style={[{ textAlign: 'center' }]}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </AlertModal>
  );
};

export default ModalConfirm;