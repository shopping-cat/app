import * as React from "react"
import { Animated } from "react-native"
import Svg, { Path } from "react-native-svg"

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface BackArrowIconProps {
    fill: any
}

const CartIcon: React.FC<BackArrowIconProps> = ({ fill }) => {
    return (
        <Svg
            data-name="Icon / Shopping Cart / Outlined"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <AnimatedPath
                d="M18 22a2 2 0 01-1.99-2A2 2 0 0118 18a2 2 0 012 2 2 2 0 01-2 2zM8 22a2 2 0 01-1.99-2A2 2 0 018 18a2 2 0 012 2 2 2 0 01-2 2zm12-5H8a1.978 1.978 0 01-1.715-.976 2 2 0 01-.035-1.994l1.35-2.441L4 4H2V2h3.271l.94 2h14.8a.99.99 0 01.861.493.985.985 0 01.01.986l-3.581 6.49a1.988 1.988 0 01-1.749 1.029h-7.45l-1.1 2h12v2zM7 6l2.4 5h7l2.8-5z"
                fill={fill}
            />
            {/* <Path fill="none" d="M0 0h24v24H0z" /> */}
        </Svg>
    )
}

export default CartIcon
