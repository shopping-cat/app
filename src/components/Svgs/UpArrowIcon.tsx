import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
import { COLOR1 } from "../../constants/styles"

const UpArrowIcon = () => {
    return (
        <Svg
            width={14.828}
            height={22.414}
            viewBox="0 0 14.828 22.414"
        >
            <G
                fill="none"
                stroke={COLOR1}
                strokeLinecap="round"
                strokeWidth={2}
            >
                <Path data-name="\uC120 9" d="M7.414 1.414v20" />
                <G data-name="\uADF8\uB8F9 71">
                    <Path data-name="\uD328\uC2A4 2121" d="M7.414 1.414l-6 6" />
                    <Path data-name="\uD328\uC2A4 2122" d="M7.414 1.414l6 6" />
                </G>
            </G>
        </Svg>
    )
}

export default UpArrowIcon
