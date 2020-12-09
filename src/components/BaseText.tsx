import React from 'react'
import { StyleSheet, Text, TextProps, View } from 'react-native'

const BaseText: React.FC<TextProps> = (props) => <Text style={[styles.baseStyle, props.style]} {...props} />

export default BaseText

const styles = StyleSheet.create({
    baseStyle: {

    }
})
export const baseTextStyle = styles.baseStyle