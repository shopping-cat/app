import React from 'react'
import Svg, { Path } from "react-native-svg"

const NumberCounterMinusIcon = () => {
    return (
        <Svg
            width={12}
            height={2}
            viewBox="0 0 12 2"
        >
            <Path
                fill="none"
                stroke="#8b8b8b"
                strokeLinecap="round"
                strokeWidth={2}
                d="M1 1h10"
            />
        </Svg>
    )
}

export default NumberCounterMinusIcon