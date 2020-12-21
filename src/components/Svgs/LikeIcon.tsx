import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface LikeIconProps {
    isUnlike?: boolean
    fill: string
}

const LikeIcon: React.FC<LikeIconProps> = ({ fill, isUnlike }) => {
    return (
        <View
            style={{ transform: [{ rotate: isUnlike ? '180deg' : '0deg' }] }}
        >
            <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
            >
                <Path
                    d="M21.406 9.558a12.863 12.863 0 01-3.977-.744C18.238 5.531 18.682 0 15.233 0c-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.4V10H0v12h6v-.9a19.2 19.2 0 016.169 1.746A13.263 13.263 0 0017.505 24c2.538 0 4.3-1 5.009-3.686A69.145 69.145 0 0024 12.064a2.433 2.433 0 00-2.594-2.506zM4 20H2v-8h2zm15.9-5.583s.2.01 1.069-.027c1.082-.046 1.051 1.469 0 1.563l-1.761.1a.59.59 0 00.141 1.172s.686-.017 1.143-.041c1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115a.574.574 0 10.113 1.14l.771-.031c.822-.074 1 .825-.292 1.661-1.567.881-4.685.131-6.416-.614A18.851 18.851 0 006 19v-6c3.264-.749 6.328-2.254 8.321-9.113C15.219.8 16 1.956 16 4.461a21.99 21.99 0 01-.921 5.533A16.361 16.361 0 0021.2 11.55c1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"
                    fill={fill}
                />
            </Svg>
        </View>
    )
}

LikeIcon.defaultProps = {
    isUnlike: false
}

export default LikeIcon