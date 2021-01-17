import React from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import { baseTextStyle } from './BaseText'


const UnderLineInput: React.FC<TextInputProps> = (props) => {
    return (
        <View style={styles.container} >
            <TextInput
                style={[baseTextStyle, styles.textInput]}
                placeholderTextColor={GRAY}
                {...props}
            />
        </View>
    )
}

export default UnderLineInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    textInput: {
    }
})
