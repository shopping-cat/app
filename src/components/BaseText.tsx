import React from 'react'
import { StyleSheet, Text, TextProps, View } from 'react-native'

const BaseText: React.FC<TextProps> = (props) => <Text  {...props} style={[styles.baseStyle, props.style]} />

export default BaseText

const styles = StyleSheet.create({
    baseStyle: {
        fontFamily: 'BMJUA'
    }
})
export const baseTextStyle = styles.baseStyle