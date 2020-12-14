import * as React from "react"
import { View } from "react-native"
import Svg, { Path } from "react-native-svg"

interface StarIconProps {
  fill: string
  size: number
}

const StarIcon: React.FC<StarIconProps> = ({ fill, size }) => {
  return (
    <Svg
      style={{ width: size, height: size }}
      scale={size / 23}
      width={23}
      height={22}
      viewBox={`0 0 ${23} ${22}`}
    >
      <Path
        d="M11.028 1.342a.5.5 0 01.943 0l2.289 6.514a.5.5 0 00.459.334l6.873.177a.5.5 0 01.292.9l-5.462 4.209a.5.5 0 00-.174.538l1.957 6.631a.5.5 0 01-.764.553l-5.657-3.916a.5.5 0 00-.569 0l-5.657 3.911a.5.5 0 01-.764-.553l1.957-6.63a.5.5 0 00-.174-.538L1.115 9.263a.5.5 0 01.292-.9L8.28 8.19a.5.5 0 00.459-.334z"
        fill={fill}
      />
    </Svg>
  )
}

export default StarIcon
