import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import TouchableScale from './TouchableScale'

interface BorderyButtonProps {
    active?: boolean
    style?: StyleProp<ViewStyle>
    onPress: () => void
}

const BorderyButton: React.FC<BorderyButtonProps> = ({ active, children, style, onPress }) => {
    return (
        <TouchableScale
            onPress={onPress}
            contianerStyle={[styles.container, style]}
            style={[styles.removeBtn, { borderWidth: active ? 1 : 0, backgroundColor: active ? undefined : VERY_LIGHT_GRAY }]}
        >
            <BaseText style={{ color: active ? '#000' : LIGHT_GRAY }} >{children}</BaseText>
        </TouchableScale>
    )
}

BorderyButton.defaultProps = {
    active: true
}

export default BorderyButton

const styles = StyleSheet.create({
    container: {
    },
    removeBtn: {
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        paddingHorizontal: 12,
        borderColor: LIGHT_GRAY
    }
})
