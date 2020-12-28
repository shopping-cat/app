import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { COLOR1 } from '../../constants/styles'

interface CheckIconProps {
    fill?: string
}

const CheckIcon: React.FC<CheckIconProps> = ({ fill }) => {
    return (
        <Svg
            width={13.393}
            height={9.11}
            viewBox="0 0 13.393 9.11"
        >
            <Path
                d="M1.415 4.243L5.283 8.11l6.7-6.7"
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            />
        </Svg>
    )
}

CheckIcon.defaultProps = {
    fill: COLOR1
}

export default CheckIcon