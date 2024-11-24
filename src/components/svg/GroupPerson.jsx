import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
import { colors } from "../../styles/Colors"

function GroupPerson({ color = colors.MAIN_BLUE_CLIENT, size = 32, props }) {
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
      className="lucide lucide-users"
      {...props}
    >
      <Path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <Circle cx={9} cy={7} r={4} />
      <Path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </Svg>
  )
}

export default GroupPerson
