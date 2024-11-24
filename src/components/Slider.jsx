import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');

export const dataSlider = [
  {
    id: 1,
    url: [
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
    ],
  },
  {
    id: 2,
    url: [
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
    ],
  },
  {
    id: 3,
    url: [
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
    ],
  },
  {
    id: 4,
    url: [
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
      "https://ongvangvietnam.com/_next/image?url=https%3A%2F%2Fwww.btaskee.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fhome-page-an-tam-voi-lua-chon-cua-ban.png&w=3840&q=100",
    ],
  }
];

const Slider = () => {
  // Lấy tất cả các URL từ dataSlider
  const imageUrls = dataSlider.reduce((acc, item) => {
    return acc.concat(item.url);
  }, []);

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        showPagination
        data={imageUrls}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    width,
    justifyContent: 'center',
  },
  image: {
    width,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slider;
