import React from 'react'
import Svg, { G, Path } from "react-native-svg"

const NumberCounterPlusIcon = () => {
    return (
        <Svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
        >
            <G
                fill="none"
                stroke="#8b8b8b"
                strokeLinecap="round"
                strokeWidth={2}
            >
                <Path data-name="\uC120 72" d="M1 6h10" />
                <Path data-name="\uC120 73" d="M6 1v10" />
            </G>
        </Svg>
    )
}

export default NumberCounterPlusIcon
