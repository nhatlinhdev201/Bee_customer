import MainStyle from "../styles/MainStyle";
import { Image, Text, View } from "react-native";
import { logo_bee_blue } from "../assets";
import { colors } from "../styles/Colors";

const Logo = ({ sizeImage = 120 }) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={logo_bee_blue}
          style={{
            with: sizeImage,
            height: sizeImage,
            resizeMode: 'contain',
          }}
        />
      </View>
    </>
  )
}

export default Logo;
