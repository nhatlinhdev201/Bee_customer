import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
import { colors } from "../../styles/Colors"

function EditUser({ color = colors.MAIN_BLUE_CLIENT, size = 32, ...props }) {
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
      className="lucide lucide-user-pen"
      {...props}
    >
      <Path d="M11.5 15H7a4 4 0 00-4 4v2M21.378 16.626a1 1 0 00-3.004-3.004l-4.01 4.012a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506z" />
      <Circle cx={10} cy={7} r={4} />
    </Svg>
  )
}

export default EditUser
