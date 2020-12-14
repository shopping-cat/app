import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { WIDTH } from '../../constants/styles'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedRect = Animated.createAnimatedComponent(Rect)
interface ItemDetailHeaderBackgroundProps {
    color1: any
    color2: any
}

const ItemDetailHeaderBackground: React.FC<ItemDetailHeaderBackgroundProps> = ({ color1, color2 }) => {
    return (
        <Svg style={{ position: 'absolute' }} height={56} width={WIDTH}>
            <Defs>
                <AnimatedLinearGradient id='grad' x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={color1} stopOpacity="1" />
                    <Stop offset="1" stopColor={color2} stopOpacity="1" />
                </AnimatedLinearGradient>
            </Defs>
            <AnimatedRect width={WIDTH} height={56} fill="url(#grad)" />
        </Svg>
    )
}

export default ItemDetailHeaderBackground

const styles = StyleSheet.create({})
