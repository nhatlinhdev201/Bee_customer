import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../../styles/Colors";

function Star({ color = colors.MAIN_BLUE_CLIENT, size = 32, fill = colors.MAIN_COLOR_CLIENT, props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-star"
      {...props}
    >
      <Path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
    </Svg>
  )
}

export default Star;
