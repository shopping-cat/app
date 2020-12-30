import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { GRAY } from '../../constants/styles'

interface DownArrowIconProps {
    fill?: string
}

const DownArrowIcon: React.FC<DownArrowIconProps> = ({ fill }) => {
    return (
        <Svg
            width={12.427}
            height={7.214}
            viewBox="0 0 12.427 7.214"
        >
            <Path
                d="M1.414 1.414l4.8 4.8 4.8-4.8"
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            />
        </Svg>
    )
}

DownArrowIcon.defaultProps = {
    fill: GRAY
}

export default DownArrowIcon
