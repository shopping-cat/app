import React from 'react'
import Svg, { Path } from 'react-native-svg'

const RightArrowIcon: React.FC<{ fill: string }> = ({ fill }) => {
    return (
        <Svg
            width={7.214}
            height={12.427}
            viewBox="0 0 7.214 12.427"
        >
            <Path
                d="M1.414 11.013l4.8-4.8-4.8-4.8"
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            />
        </Svg>
    )
}

export default RightArrowIcon
