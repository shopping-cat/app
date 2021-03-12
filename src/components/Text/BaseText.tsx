import React from 'react'
import { StyleSheet, Text, TextProps, View } from 'react-native'

class BaseText extends React.Component<TextProps>{
    render() {
        return (
            <Text  {...this.props} style={[styles.baseStyle, this.props.style]} />
        )
    }

}

export default BaseText

const styles = StyleSheet.create({
    baseStyle: {
        fontFamily: 'BMJUA'
    }
})
export const baseTextStyle = styles.baseStyle