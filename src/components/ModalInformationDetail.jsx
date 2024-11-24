import React, { useRef, useEffect } from 'react';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Box from './Box';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import RenderHTML from 'react-native-render-html';

const ModalInformationDetail = ({ children, isOpen, onClose, snapPoints, initialIndex, onChange, content }) => {
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current.present();
    } else {
      bottomSheetModalRef.current.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={initialIndex}
        snapPoints={snapPoints}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} pressBehavior="close" />}
        onChange={onChange}
        onClose={onClose}
        onDismiss={onClose}
      >
        <View style={[styles.contentContainer]}>
          <ScrollView>
            <RenderHTML
              contentWidth={SCREEN_WIDTH}
              source={{ html: content?.ContentService }}
              ignoredDomTags={['o:p']}
            />
            <Box height={SCREEN_HEIGHT * 0.07} />
          </ScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ModalInformationDetail;
