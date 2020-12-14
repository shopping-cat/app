import * as React from "react"
import { Animated } from "react-native"
import Svg, { Path } from "react-native-svg"

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface BackArrowIconProps {
    fill: any
}

const BackArrowIcon: React.FC<BackArrowIconProps> = ({ fill }) => {
    return (
        <Svg
            width={11.246}
            height={20.491}
            viewBox="0 0 11.246 20.491"
        >
            <AnimatedPath
                d="M9.831 1.414L.999 10.245l8.832 8.831"
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            />
        </Svg>
    )
}

export default BackArrowIcon
