import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from './BaseText'

interface UnderLineTextProps {
    style?: StyleProp<ViewStyle>
    lineStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    onPress?: () => void
}

const UnderLineText: React.FC<UnderLineTextProps> = ({ children, lineStyle, textStyle, style, onPress }) => {

    const [width, setWidth] = useState(0)

    return (
        <Pressable onPress={onPress && onPress} style={[style]} >
            <BaseText style={[styles.text, textStyle]} onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)} >{children}</BaseText>
            <View style={[{ width }, styles.line, lineStyle]} />
        </Pressable>
    )
}

export default UnderLineText

const styles = StyleSheet.create({
    text: {
        marginTop: 16,
        alignSelf: 'flex-start'
    },
    line: {
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        marginTop: 16
    }
})