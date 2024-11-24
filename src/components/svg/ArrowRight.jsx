import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors";

function ArrowRight({ color = colors.MAIN_BLUE_CLIENT, size = 24 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-right"
    >
      <Path d="M5 12h14M12 5l7 7-7 7" />
    </Svg>
  )
}

export default ArrowRight;