import React, { useRef, useEffect, useState, memo } from 'react';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const BottomModalComp = ({
  children,
  isOpen,
  onClose,
  initialIndex = 0,
  onChange,
}) => {
  const bottomSheetModalRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0); // State để lưu chiều cao của nội dung

  useEffect(() => {
    // Cập nhật modal mỗi khi trạng thái isOpen thay đổi
    if (isOpen) {
      bottomSheetModalRef.current?.present(); // Đảm bảo gọi present() nếu modal được mở
    } else {
      bottomSheetModalRef.current?.dismiss(); // Đảm bảo gọi dismiss() nếu modal được đóng
    }
  }, [isOpen]);

  // Xử lý chiều cao tự động cho modal
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);  // Lưu chiều cao của nội dung
  };

  // Cập nhật snapPoints với chiều cao nội dung đã tính toán
  const getSnapPoints = () => {
    if (contentHeight > 0) {
      // Nếu contentHeight hợp lệ, sử dụng giá trị đó dưới dạng số
      return [contentHeight];
    }
    // Nếu không có contentHeight hợp lệ, sử dụng giá trị mặc định hợp lý
    return ['90%'];  // Một giá trị mặc định hợp lý
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={initialIndex}
        snapPoints={getSnapPoints()}  // Cập nhật snapPoints từ hàm
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} pressBehavior="close" />
        )}
        onChange={onChange}
        onClose={onClose}
        onDismiss={onClose}
      >
        {/* Dùng KeyboardAvoidingView và ScrollView */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} onLayout={handleLayout}>
            <View style={{ flex: 1 }}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export const BottomModal = memo(BottomModalComp);
