import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';

const TabHeader = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabHeader}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === 'Đang Làm Việc' && styles.selectedTabButton,
        ]}
        onPress={() => setSelectedTab('Đang Làm Việc')}
      >
        <Text
          style={[
            styles.tabButtonText,
            selectedTab === 'Đang Làm Việc' && styles.selectedTabButtonText,
          ]}
        >
          Đang Làm Việc
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          selectedTab === 'Dịch Vụ Đã Đặt' && styles.selectedTabButton,
        ]}
        onPress={() => setSelectedTab('Dịch Vụ Đã Đặt')}
      >
        <Text
          style={[
            styles.tabButtonText,
            selectedTab === 'Dịch Vụ Đã Đặt' && styles.selectedTabButtonText,
          ]}
        >
          Dịch Vụ Đã Đặt
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.DARK_BLUE,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTabButton: {
    borderBottomColor: colors.WHITE,
  },
  tabButtonText: {
    color: colors.WHITE,
    fontSize: 18,
  },
  selectedTabButtonText: {
    fontWeight: 'bold',
  },
});

export default TabHeader;
