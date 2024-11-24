import React, { useRef, useEffect, memo } from 'react';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Button, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Box from './Box';
import MainStyles, { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/MainStyle';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { themeColors } from '../styles/Colors';
import { Icon } from '@ui-kitten/components';
import { ScreenNames, StorageNames } from '../Constants';
import { consoleLog, getData, setData } from '../Utils';

const ModalSelectLocationComp = ({
  modalVisible,
  setModalVisible,
  onClose,
  snapPoints,
  initialIndex,
  onChange,
  locations = [],
  setLocations = () => { },
  locationSelect = {},
  setLocationSelect = () => { },
  service,
}) => {
  const bottomSheetModalRef = useRef(null);
  const navi = useNavigation();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLocationSelect = async (location) => {
    setLocationSelect(location);
    let getLocation = await getData(StorageNames.LOCATION);
    let temp = getLocation.map((item) => {
      if (item.Id !== location.Id) {
        item.Selected = false;
        return item;
      }
      if (item.Id === location.Id) {
        item.Selected = true;
        return item;
      }
    })
    setLocations(temp);
    await setData(StorageNames.LOCATION, temp);
    toggleModal();
  };
  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current.present();
    } else {
      bottomSheetModalRef.current.dismiss();
    }
  }, [modalVisible]);

  const renderLocationItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.locationCard,
        item?.Selected && styles.selectedLocationCard,
      ]}
      onPress={async () => handleLocationSelect(item)}
    >
      <Icon
        name={item?.Selected ? 'radio-button-on' : 'radio-button-off'}
        fill={item?.Selected ? themeColors.confirm : '#ccc'}
        style={styles.radioIcon}
      />
      {/* <Text style={styles.locationText}>{item.Address}</Text> */}
      <View style={MainStyles.flexRowFlexStart}>
        {/* <Icon
          style={MainStyles.CardIcon}
          fill={themeColors.iconcb}
          name="pin-outline"
        /> */}
        <Text style={MainStyles.textCardJob}>
          {item.Address}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.modalContent}>
              {
                locations && locations.length > 0 ? (
                  <View style={styles.flatListContent}>
                    {
                      locations.slice(0, 4).map((item, index) => renderLocationItem({ item, index }))
                    }
                  </View>
                ) : (
                  <ActivityIndicator size="large" color={themeColors.accent} />
                )
              }

              <TouchableOpacity style={styles.createButton}
                onPress={() => {
                  setModalVisible(false);
                  navi.navigate(ScreenNames.ADDRESS_SEARCH, { service: service, previous: true, previousScreen: ScreenNames.BOOKING_FORM_SCREEN });
                }}
              >
                <Text style={styles.createButtonText}>Thêm địa chỉ</Text>
                <Icon name="arrow-ios-forward-outline" fill="#fff" style={styles.createButtonIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Box height={SCREEN_HEIGHT * 0.07} />
        </ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
    height: SCREEN_HEIGHT * 0.7,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: themeColors.confirm,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  createButtonIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
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
  container: {
    margin: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {

  },
  flatListContent: {
    paddingBottom: 20,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.lightBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedLocationCard: {
    borderWidth: 1,
    borderColor: themeColors.confirm,
  },
  radioIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  locationText: {
    fontSize: 15,
    maxWidth: SCREEN_WIDTH * 0.7,
  },
  viewMoreButton: {
    backgroundColor: themeColors.confirm,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const ModalSelectLocation = memo(ModalSelectLocationComp);
