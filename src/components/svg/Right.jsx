import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors"

function Right({ color = colors.MAIN_BLUE_CLIENT, size = 32 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-right"
    >
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  )
}

export default Right
