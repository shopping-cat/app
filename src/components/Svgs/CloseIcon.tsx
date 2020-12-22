import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { GRAY } from '../../constants/styles'

const CloseIcon = () => {
    return (
        <Svg
            width={7.533}
            height={7.533}
            viewBox="0 0 7.533 7.533"
        >
            <G
                data-name="\uADF8\uB8F9 70"
                fill="none"
                stroke={GRAY}
                strokeLinecap="round"
                strokeWidth={2}
            >
                <Path data-name="\uC120 7" d="M1.414 1.414l4.704 4.704" />
                <Path data-name="\uC120 8" d="M6.118 1.414L1.414 6.118" />
            </G>
        </Svg>
    )
}

export default CloseIcon
