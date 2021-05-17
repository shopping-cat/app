import * as React from "react"
import { Animated } from "react-native"
import Svg, { Path } from "react-native-svg"

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
    fill: any
}

const LoginIcon: React.FC<Props> = ({ fill }) => {
    return (
        <Svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
        >
            {/* <AnimatedPath fill={fill} d="M0 0h24v24H0z" /> */}
            <AnimatedPath fill={fill} d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
        </Svg>
    )
}

export default LoginIcon
